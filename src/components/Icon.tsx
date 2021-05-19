import React from 'react'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  library,
  IconPrefix,
  SizeProp,
} from '@fortawesome/fontawesome-svg-core'

import {
  faMapMarkerAlt,
  faCalendar,
  faTimes,
  faChevronDown,
  faCircleNotch,
  faCheck,
  faChevronLeft,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'

import { faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { rotate } from 'utils'

export type IconName =
  | 'map-marker-alt'
  | 'calendar'
  | 'times'
  | 'facebook-f'
  | 'twitter'
  | 'chevron-down'
  | 'circle-notch'
  | 'check'
  | 'chevron-left'
  | 'arrow-left'
  | 'map-marker-alt'

interface Props {
  icon?: IconName
  isPadded?: boolean
  isCentre?: boolean
  isSpinning?: boolean
  prefix?: string
  size?: SizeProp
}

library.add(
  faTwitter,
  faFacebookF,
  faTimes,
  faChevronDown,
  faCalendar,
  faMapMarkerAlt,
  faCircleNotch,
  faCheck,
  faChevronLeft,
  faArrowLeft,
  faMapMarkerAlt
)

const IconWrapper = styled.div<{
  isPadded: boolean
  isCentre: boolean
  isSpinning: boolean
}>(props => {
  const { isPadded, isCentre, isSpinning } = props

  return css`
    display: flex;
    margin-right: ${isPadded ? '0.5rem' : 0};
    vertical-align: middle;
    pointer-events: none;

    ${isCentre &&
    css`
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
    `}

    path {
      pointer-events: none;
      fill: inherit;
    }

    svg {
      pointer-events: none;
      ${isSpinning &&
      css`
        animation: ${rotate} 1s linear infinite;
      `}
    }
  `
})

const Icon: React.FC<Props> = ({
  icon = 'times-circle',
  isSpinning,
  isPadded,
  isCentre,
  prefix = 'fas',
  size = '1x',
}) => (
  <IconWrapper
    isPadded={isPadded !== undefined ? isPadded : false}
    isCentre={isCentre !== undefined ? isCentre : false}
    isSpinning={isSpinning !== undefined ? isSpinning : false}
  >
    <FontAwesomeIcon
      size={size}
      icon={[prefix as IconPrefix, icon as IconName]}
      fixedWidth={true}
    />
  </IconWrapper>
)

export { Icon }
