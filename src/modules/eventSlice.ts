//Services
import Api from 'services/api'

// Utils
import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  EntityId,
} from '@reduxjs/toolkit'
import { DateTime } from 'luxon'
import { normalize, schema } from 'normalizr'

//Types
import { RootState } from 'app/store'
import { Event } from 'shared-types'

const eventEntity = new schema.Entity<Event>('events')
const eventsEntity = [eventEntity]

type EventsResponse = {
  events?: { [key: string]: Event }
}

export const eventsAdapter = createEntityAdapter<Event>()

export const fetchEvents = createAsyncThunk<
  EventsResponse,
  void,
  {
    state: RootState
  }
>('events/fetch', async (_, { getState }) => {
  const apiKey = getState().settings.apiKey
  const response = await Api.fetch<Event[]>('/event/', apiKey, {
    gte: DateTime.utc().toISO(),
    resultsPerPage: 100,
  })
  const normalized = normalize(response.data, eventsEntity)
  return normalized.entities
})

export const fetchEvent = createAsyncThunk<
  EventsResponse,
  EntityId,
  {
    state: RootState
  }
>('event/fetch', async (eventId, { getState }) => {
  const apiKey = getState().settings.apiKey
  const response = await Api.fetch<Event>(`/event/${eventId}/`, apiKey)
  const normalized = normalize(response.data, eventEntity)
  return normalized.entities
})

const eventSlice = createSlice({
  name: 'events',
  initialState: eventsAdapter.getInitialState({
    loading: 'idle',
    lastFetch: undefined,
  }),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEvents.pending, (state, action) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      if (action.payload.events) {
        eventsAdapter.setAll(state, action.payload.events)
        state.loading = 'fetched'
      }
    })
    builder.addCase(fetchEvent.pending, (state, action) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchEvent.fulfilled, (state, action) => {
      if (action.payload.events) {
        eventsAdapter.upsertMany(state, action.payload.events)
      }
      state.loading = 'idle'
    })
  },
})

// Selectors
export const eventSelectors = eventsAdapter.getSelectors<RootState>(
  state => state.event
)
export const selectIsLoading = (state: RootState) =>
  state.event.loading === 'pending'
export const selectIsFetched = (state: RootState) =>
  state.event.loading === 'fetched'
// Reducer
export default eventSlice.reducer
