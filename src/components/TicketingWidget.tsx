import React, { useEffect } from 'react'
import styled from 'styled-components'

// Utils
import { Helmet } from 'react-helmet'

declare global {
  interface Window {
    LineupTicketingLoader: any
  }
}

interface Props {
  eventId: string
  backgroundColor: string
  mainColor: string
  apikey: string
}

const TicketingWidgetContainer = styled.div`
  margin-bottom: 2rem;
`

const TicketingWidget: React.FC<Props> = ({
  eventId,
  backgroundColor,
  mainColor,
  apikey,
}) => {
  const LOADER_URL = process.env.REACT_APP_LOADER_URL

  useEffect(() => {
    window.LineupTicketingLoader && window.LineupTicketingLoader.setupWidgets()
  }, [])

  return (
    <>
      <Helmet>
        <script src={LOADER_URL} />
      </Helmet>
      <TicketingWidgetContainer
        className='lineup-ticketing'
        data-lineup-background-color={backgroundColor}
        data-lineup-main-color={mainColor}
        data-lineup-api-key={apikey}
        data-lineup-event-id={eventId}
      >
        <a href={window.location.href}>Buy Tickets</a>
      </TicketingWidgetContainer>
    </>
  )
}

export { TicketingWidget }
