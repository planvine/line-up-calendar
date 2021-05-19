// Utils
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//Types
import { RootState } from 'app/store'

type SettingsState = {
  apiKey: string
}

const initialState: SettingsState = {
  apiKey: '',
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setApiKey(state, action: PayloadAction<string>) {
      state.apiKey = action.payload
    },
  },
})

// Selectors
export const selectApiKey = (state: RootState) => state.settings.apiKey

// Actions
export const { setApiKey } = settingsSlice.actions

// Reducer
export default settingsSlice.reducer
