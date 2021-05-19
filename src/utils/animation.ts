import { keyframes } from 'styled-components'

export const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const pulse = keyframes`
  from {
    stroke-width: 3px;
    stroke-opacity: 1;
    transform: scale(0.3);
  }
  to {
    stroke-width: 0;
    stroke-opacity: 0;
    transform: scale(2);
  }
`

export const bannerIn = keyframes`
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  80% {
    transform: translateY(0);
  }
  100% {
    opacity: 1;
  }
`
