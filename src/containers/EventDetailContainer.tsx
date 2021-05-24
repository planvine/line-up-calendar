import React, { useEffect, useContext } from 'react'

// Utils
import styled from 'styled-components'
import Imgix from 'react-imgix'
import { ThemeContext } from 'styled-components'
import { media } from 'utils'

// Components
import {
  Title,
  Button,
  IconTitle,
  Icon,
  TicketingWidget,
  Map,
  Loader,
} from 'components'

// Actions
import { fetchEvent } from 'modules/eventSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'

// Routing
import { useHistory, useParams } from 'react-router'
import { useQuery } from 'app/hooks'

// Selectors
import { eventSelectors, selectIsLoading } from 'modules/eventSlice'
import { selectApiKey } from 'modules/settingsSlice'

const ContentWrapper = styled.div`
  display: flex;
  background: ${props => props.theme.colors.mainBackgroundColor};
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 2rem;
  flex-direction: row;
  ${media.tablet} {
    flex-direction: column;
    padding-top: 1rem;
  }
`

const LeftColumn = styled.div`
  flex: 0 1 4%;
  padding: 0 2%;
  order: 1;
  ${media.tablet} {
    order: 1;
    margin-bottom: 1rem;
    margin-left: 5%;
    width: 95%;
    padding: 0;
  }
`
const CentreColumn = styled.div`
  flex: 2 1 50%;
  margin-right: 3%;
  padding-bottom: 2rem;
  order: 2;
  ${media.tablet} {
    order: 3;
    width: 90%;
    margin: 1.5rem 0 0 0;
    padding: 0 5% 2rem 5%;
  }
`
const RightColumn = styled.div`
  flex: 1 0 30%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  background: ${props => props.theme.colors.secondaryBackgroundColor};
  order: 3;
  ${media.tablet} {
    order: 2;
    width: 100%;
  }
`
const CloseButton = styled.button`
  background: ${props => props.theme.colors.mainColor};
  fill: #fff;
  color: #fff;
  height: 2.125rem;
  width: 2.125rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background: ${props => props.theme.colors.accentColor};
  }
`

const MapWrapper = styled.div``

const StyledImgix = styled(Imgix)`
  width: 35vw;
`

const EventCopy = styled.span`
  color: ${props => props.theme.colors.copyColor};
  font-family: ${props => props.theme.font.copy};
  font-size: 1.1em;
  line-height: 1.4;
  margin: 2rem 0;
  display: block;
`

const PoweredByButton = styled(Button)`
  margin-top: 1rem;
  font-size: 0.75rem;
  color: ${props => props.theme.colors.mainBackgroundColorComplement};
`

const EventDetailContainer: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>()
  const dispatch = useAppDispatch()
  const history = useHistory()
  const query = useQuery()

  const apiKey = useAppSelector(selectApiKey)

  // Hooks
  useEffect(() => {
    if (apiKey) {
      dispatch(fetchEvent(eventId))
    }
  }, [eventId, apiKey, dispatch])

  // Selectors
  const theme = useContext(ThemeContext)
  const event = useAppSelector(state =>
    eventSelectors.selectById(state, eventId)
  )
  const isLoading = useAppSelector(selectIsLoading)

  const handleCloseClick = () => {
    history.push({ pathname: '/', search: query.toString() })
  }

  if (!event || isLoading) {
    return <Loader />
  }
  return (
    <ContentWrapper>
      <LeftColumn>
        <CloseButton onClick={handleCloseClick}>
          <Icon icon='arrow-left' />
        </CloseButton>
      </LeftColumn>
      <CentreColumn>
        <>
          <Title
            isCapitalised={false}
            isCentralised={false}
            size='large'
            isBold={true}
          >
            {event.title}
          </Title>
          <IconTitle
            icon='map-marker-alt'
            title={event.venue.name}
            size='large'
          />
          <EventCopy
            dangerouslySetInnerHTML={{
              __html: event.description ?? '',
            }}
          />
          <TicketingWidget
            eventId={eventId}
            backgroundColor={theme.colors.mainBackgroundColor}
            mainColor={theme.colors.accentColor}
            apikey={apiKey}
          />
          <MapWrapper>
            <Title
              isCapitalised={false}
              isCentralised={false}
              size='small'
              isBold={true}
            >
              Location:
            </Title>
            <Map lat={event.venue.lat} lng={event.venue.lng} />
          </MapWrapper>
          <PoweredByButton
            isLink={true}
            text='Powered by Line-Up'
            href='https://lineupnow.com/'
          />
        </>
      </CentreColumn>
      <RightColumn>
        <StyledImgix
          src={event.image.url}
          sizes='calc(30%)'
          className='lazyload'
        />
      </RightColumn>
    </ContentWrapper>
  )
}

export { EventDetailContainer }
