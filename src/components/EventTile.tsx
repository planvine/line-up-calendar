import React from 'react'

import styled from 'styled-components'
import { Title, IconTitle } from 'components'

// Utils
import { DateTime } from 'luxon'
import Imgix from 'react-imgix'
import { fadeIn, media } from 'utils'

const EventTileImageWrapper = styled.div`
  position: relative;
  flex: 1;
`

const EventTilePadder = styled.div`
  height: 100%;
  border: 1px solid ${props => props.theme.colors.borderColor};
  border-radius: 4px;
  background: ${props => props.theme.colors.mainBackgroundColor};

  :hover {
    background: ${props => props.theme.colors.secondaryBackgroundColor};
    transition: background 0.5s ease;

    ${EventTileImageWrapper} {
      :after {
        content: 'More Info';
        font-family: ${props => props.theme.font.header};
        font-size: 0.75rem;
        text-transform: uppercase;
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;

        padding: 0.5rem;
        border-radius: 0.2rem;

        background: ${props => props.theme.colors.accentColor};

        color: white;
        animation: ${fadeIn} 0.2s;
      }
    }
  }
`

const EventTileWrapper = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  transition: background 0.2s;
  flex-basis: 23%;
  margin: 0 1% 2% 1%;
  ${media.tablet} {
    flex-basis: 48%;
    margin: 0 1% 1.5rem 1%;
  }

  ${media.phone} {
    flex-basis: 100%;
    margin: 0 1% 1.5rem 1%;
  }
`

const EventTileDescriptionWrapper = styled.div`
  padding: 1rem;
`

const StyledImgix = styled(Imgix)`
  width: 100%;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`

const StyledTitle = styled(Title)`
  margin-bottom: 0.5rem;
  ${media.phone} {
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
  }
`

interface Props {
  id: number
  title: string
  venue: string
  imageUrl: string
  date?: string
  time?: string
  onClick: (id: number) => void
}

const EventTile: React.FC<Props> = ({
  id,
  imageUrl,
  title,
  venue,
  date,
  time,
  onClick,
}) => {
  const handleClick = () => onClick && onClick(id)

  return (
    <EventTileWrapper>
      <EventTilePadder onClick={handleClick}>
        <EventTileImageWrapper>
          {imageUrl && (
            <StyledImgix
              src={imageUrl}
              sizes='calc(25%)'
              imgixParams={{ ar: '16:9', fit: 'crop', crop: 'edges' }}
              className='lazyload'
            />
          )}
        </EventTileImageWrapper>
        <EventTileDescriptionWrapper>
          <StyledTitle
            isCapitalised={false}
            isCentralised={false}
            size='medium'
            isBold={true}
          >
            {title}
          </StyledTitle>
          {venue && <IconTitle icon='map-marker-alt' title={venue} />}
          {date && (
            <IconTitle
              icon='calendar'
              title={DateTime.fromSQL(`${date} ${time}`).toLocaleString(
                DateTime.DATETIME_MED
              )}
            />
          )}
        </EventTileDescriptionWrapper>
      </EventTilePadder>
    </EventTileWrapper>
  )
}

export { EventTile }
