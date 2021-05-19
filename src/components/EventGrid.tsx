import React from 'react'
import styled from 'styled-components'
import { EventTile } from './EventTile'

//Types
import { Event } from 'shared-types'
import { EntityId } from '@reduxjs/toolkit'

interface Props {
  events: Event[]
  onEventClick: (id: EntityId) => void
}

const EventGridWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  padding: 2rem 2% 0 2%;
`

const EventGridEmpty = styled.span`
  font-family: ${props => props.theme.font.copy};
  width: 100%;
  display: block;
  text-align: center;
  margin: 2rem;
  color: ${props => props.theme.colors.mainBackgroundColorComplement};
`

const EventsGrid: React.FC<Props> = ({ events, onEventClick }) => {
  return (
    <EventGridWrapper>
      {events.length > 0 &&
        events.map(event => (
          <EventTile
            key={`event-tile-${event.id}`}
            id={event.id}
            title={event.title}
            venue={event.venue.name}
            date={event.nextPerformance?.startDate}
            time={event.nextPerformance?.startTime}
            imageUrl={event.image.url}
            onClick={onEventClick}
          />
        ))}

      {events.length === 0 && (
        <EventGridEmpty>There are no upcoming events</EventGridEmpty>
      )}
    </EventGridWrapper>
  )
}

export { EventsGrid }
