import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import eventSlice from 'modules/eventSlice'
import settingsSlice from 'modules/settingsSlice'

export const store = configureStore({
  reducer: {
    event: eventSlice,
    settings: settingsSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
