import styled, { css, DefaultTheme } from 'styled-components'

export declare type TitleSize = 'small' | 'medium' | 'large'

interface Props {
  theme: DefaultTheme
  isCapitalised?: boolean
  isCentralised?: boolean
  isPadded?: boolean
  size?: TitleSize
  isBold?: boolean
}

const Title = styled.span<Props>`
  text-transform: ${props => (props.isCapitalised ? 'uppercase' : 'initial')};
  color: ${props => props.theme.colors.headingColor};
  text-align: ${props => (props.isCentralised ? 'center' : 'initial')};
  font-family: ${props =>
    props.isBold ? props.theme.font.header : props.theme.font.copy};
  display: block;
  line-height: 1.2;

  ${props =>
    props.size === 'small' &&
    css`
      font-size: 0.9rem;
      padding: 0 0 1.25rem 0;
    `}

  ${props =>
    props.size === 'medium' &&
    css`
      font-size: 1.1rem;
      padding: 0 0 0.75rem 0;
    `}

    ${props =>
      props.size === 'large' &&
      css`
        font-size: 2rem;
        padding: 0 0 1.25rem 0;
      `}

    ${props =>
      !props.isPadded &&
      css`
        padding: 0;
      `}
`

Title.defaultProps = {
  size: 'small',
  isCapitalised: true,
  isCentralised: true,
  isPadded: true,
}

export { Title }
