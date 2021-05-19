import React, { useEffect } from 'react'

// Components
import { EventsGrid, Loader } from 'components'

// Actions
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { fetchEvents } from 'modules/eventSlice'

// Selectors
import {
  eventSelectors,
  selectIsLoading,
  selectIsFetched,
} from 'modules/eventSlice'
import { selectApiKey } from 'modules/settingsSlice'

// Routing
import { useHistory } from 'react-router-dom'
import { useQuery } from 'app/hooks'

// Types
import { EntityId } from '@reduxjs/toolkit'

const EventListContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const query = useQuery()

  const apiKey = useAppSelector(selectApiKey)
  const isFetched = useAppSelector(selectIsFetched)

  //Hooks
  useEffect(() => {
    if (apiKey && !isFetched) {
      dispatch(fetchEvents())
    }
  }, [dispatch, isFetched, apiKey])

  //Selectors
  const events = useAppSelector(eventSelectors.selectAll)
  const isLoading = useAppSelector(selectIsLoading)

  //Functions
  const handleEventClick = (id: EntityId) => {
    history.push({ pathname: `/event/${id}/`, search: query.toString() })
  }

  return isLoading ? (
    <Loader />
  ) : (
    <EventsGrid events={events} onEventClick={handleEventClick} />
  )
}

export { EventListContainer }
