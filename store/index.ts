import { create } from 'zustand'
import { createSettingsSlice, SettingsSlice } from './settingsSlice'
import { createCaptureSlice, CaptureSlice } from './captureSlice'
import { createDecorateSlice, DecorateSlice } from './decorateSlice'

type AppStore = SettingsSlice & CaptureSlice & DecorateSlice

export const useAppStore = create<AppStore>()((...args) => ({
  ...createSettingsSlice(...args),
  ...createCaptureSlice(...args),
  ...createDecorateSlice(...args),
}))
