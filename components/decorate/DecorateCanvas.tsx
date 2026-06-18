'use client'

import { useRef, useEffect, useCallback } from 'react'
import { Stage, Layer, Rect, Image as KonvaImage, Text, Transformer } from 'react-konva'
import useImage from 'use-image'
import Konva from 'konva'
import { useAppStore } from '@/store'
import { calculatePhotoLayout, getDisplayDimensions } from '@/lib/canvasUtils'
import { getFramePhotoRects } from '@/lib/frameMetadata'
import { PlacedSticker } from '@/types/decorate'

interface PhotoItemProps {
  src: string
  x: number
  y: number
  width: number
  height: number
}

function PhotoItem({ src, x, y, width, height }: PhotoItemProps) {
  const [image] = useImage(src)
  if (!image) return null

  const scaleX = width / image.width
  const scaleY = height / image.height
  const scale = Math.max(scaleX, scaleY)
  const cropW = width / scale
  const cropH = height / scale
  const cropX = (image.width - cropW) / 2
  const cropY = (image.height - cropH) / 2

  return (
    <KonvaImage
      image={image}
      x={x}
      y={y}
      width={width}
      height={height}
      crop={{ x: cropX, y: cropY, width: cropW, height: cropH }}
    />
  )
}

interface StickerLayerProps {
  stickers: PlacedSticker[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  onUpdate: (id: string, updates: Partial<PlacedSticker>) => void
}

function StickerLayer({ stickers, selectedId, onSelect, onUpdate }: StickerLayerProps) {
  const transformerRef = useRef<Konva.Transformer>(null)
  const nodeRefs = useRef<Map<string, Konva.Text>>(new Map())

  useEffect(() => {
    const tr = transformerRef.current
    if (!tr) return
    if (selectedId) {
      const node = nodeRefs.current.get(selectedId)
      if (node) {
        tr.nodes([node])
        tr.getLayer()?.batchDraw()
      }
    } else {
      tr.nodes([])
      tr.getLayer()?.batchDraw()
    }
  }, [selectedId])

  return (
    <Layer>
      {stickers.map((sticker) => (
        <Text
          key={sticker.instanceId}
          ref={(node) => {
            if (node) nodeRefs.current.set(sticker.instanceId, node)
            else nodeRefs.current.delete(sticker.instanceId)
          }}
          text={sticker.emoji}
          fontSize={sticker.width}
          x={sticker.x}
          y={sticker.y}
          rotation={sticker.rotation}
          draggable
          onClick={() => onSelect(sticker.instanceId)}
          onTap={() => onSelect(sticker.instanceId)}
          onDragEnd={(e) =>
            onUpdate(sticker.instanceId, { x: e.target.x(), y: e.target.y() })
          }
          onTransformEnd={(e) => {
            const node = e.target as Konva.Text
            const newFontSize = Math.max(20, sticker.width * node.scaleX())
            onUpdate(sticker.instanceId, {
              x: node.x(),
              y: node.y(),
              rotation: node.rotation(),
              width: newFontSize,
              height: newFontSize,
            })
            node.scaleX(1)
            node.scaleY(1)
            node.fontSize(newFontSize)
          }}
        />
      ))}
      <Transformer
        ref={transformerRef}
        keepRatio
        enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
        boundBoxFunc={(oldBox, newBox) => (newBox.width < 20 ? oldBox : newBox)}
      />
    </Layer>
  )
}

interface FrameOverlayLayerProps {
  src: string
  width: number
  height: number
}

function FrameOverlayLayer({ src, width, height }: FrameOverlayLayerProps) {
  const [image] = useImage(src)
  if (!image) return null
  return (
    <Layer>
      <KonvaImage image={image} x={0} y={0} width={width} height={height} />
    </Layer>
  )
}

interface Props {
  stageRef: React.RefObject<Konva.Stage | null>
}

export default function DecorateCanvas({ stageRef }: Props) {
  const {
    selectedBackground,
    selectedSize,
    photos,
    selectedIndices,
    layout,
    stickers,
    selectedStickerInstanceId,
    setSelectedStickerInstanceId,
    updateSticker,
  } = useAppStore()

  const { width: canvasWidth, height: canvasHeight } = getDisplayDimensions(
    selectedSize.width,
    selectedSize.height
  )

  const selectedPhotos = selectedIndices.map((i) => photos[i]).filter(Boolean)
  const frameRects = getFramePhotoRects(selectedBackground.id, canvasWidth, canvasHeight)
  const photoRects = frameRects ?? calculatePhotoLayout(layout, canvasWidth, canvasHeight)

  const handleStageClick = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (e.target === e.target.getStage()) {
        setSelectedStickerInstanceId(null)
      }
    },
    [setSelectedStickerInstanceId]
  )

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl inline-block">
      <Stage
        ref={stageRef}
        width={canvasWidth}
        height={canvasHeight}
        onClick={handleStageClick}
        onTap={handleStageClick}
        style={{ display: 'block' }}
      >
        {/* Layer 1: 흰색 배경 */}
        <Layer>
          <Rect x={0} y={0} width={canvasWidth} height={canvasHeight} fill="#ffffff" />
        </Layer>

        {/* Layer 2: 사진 4장 */}
        <Layer>
          {selectedPhotos.map((photo, i) => {
            const rect = photoRects[i]
            if (!rect || !photo) return null
            return (
              <PhotoItem
                key={photo.id}
                src={photo.dataUrl}
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
              />
            )
          })}
        </Layer>

        {/* Layer 3: PNG 오버레이 프레임 */}
        {selectedBackground.type === 'image' && (
          <FrameOverlayLayer
            src={selectedBackground.value}
            width={canvasWidth}
            height={canvasHeight}
          />
        )}

        {/* Layer 4: 스티커 */}
        <StickerLayer
          stickers={stickers}
          selectedId={selectedStickerInstanceId}
          onSelect={setSelectedStickerInstanceId}
          onUpdate={updateSticker}
        />
      </Stage>
    </div>
  )
}
