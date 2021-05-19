import React from 'react'
import styled, { css } from 'styled-components'
import { Icon, IconName } from 'components'
import { darken, lighten } from 'utils'

export type ButtonVariation = 'primary' | 'secondary' | 'light'
export type ButtonSize = 'small' | 'large'

interface Props {
  icon?: IconName
  size?: ButtonSize
  buttonType?: ButtonVariation
  text?: string
  href?: string
  isBlock?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  isLink?: boolean
  isUnderlined?: boolean
  onClick?: (e: React.MouseEvent) => void
  iconPrefix?: string
}

const ButtonWrapper = styled.button.attrs<{ buttonType: ButtonVariation }>(
  props => ({
    type: props.buttonType || 'text',
  })
)<Props>(props => {
  const {
    theme: {
      colors: {
        mainColor,
        mainColorComplement,
        secondaryColor,
        secondaryColorComplement,
      },
      font: { button, copy, header },
    },
    buttonType,
    isBlock,
    size,
    isLoading,
    icon,
    isLink,
    isUnderlined,
  } = props

  // Theme
  let backgroundColor = mainColor
  let foregroundColor = mainColorComplement
  let border = 'none'
  let font = button

  switch (buttonType) {
    case 'secondary':
      backgroundColor = secondaryColor
      foregroundColor = secondaryColorComplement
      break
    case 'light':
      backgroundColor = 'transparent'
      foregroundColor = mainColor
      border = `1px solid ${mainColor}`
      font = copy
      break
  }

  // Default
  let padding = '0.75rem 1.5rem'
  let fontSize = '0.875rem'

  switch (size) {
    case 'small':
      padding = '0.375rem 0.75rem'
      fontSize = '0.75rem'
      break
    case 'large':
      padding = '0.5rem'
      fontSize = '1.5rem'
      break
  }

  return css`
    background: ${backgroundColor};
    box-sizing: border-box;
    border: ${border};
    outline: none;
    color: ${!icon && isLoading ? 'transparent' : foregroundColor};
    fill: ${foregroundColor};
    font-family: ${font};
    line-height: 1.5rem;
    padding: ${padding};
    display: flex;
    flex-direction: row;
    justify-content: center;
    box-shadow: 0 0 0 0.1px rgba(50, 50, 93, 0.01),
      0 0.125rem 5px rgba(50, 50, 93, 0.1),
      0 1px 0.125rem rgba(50, 50, 93, 0.05);
    width: ${isBlock ? '100%' : 'initial'};
    transition: width 0.4s, background 0.2s;
    position: relative;
    cursor: pointer;
    user-select: none;

    :hover,
    :focus {
      background: ${darken(backgroundColor, 10)};
    }

    :active {
      background: ${darken(backgroundColor, 20)};
    }

    &[disabled] {
      box-shadow: none;
      background: ${lighten(backgroundColor, 40)};
      cursor: default;
      pointer-events: none;
    }

    ${!isLink &&
      css`
        text-transform: uppercase;
        font-size: ${fontSize};
      `}

    ${isLink &&
      css`
        font-size: ${fontSize};
        font-family: ${header};
        background: none;
        color: ${mainColor};
        fill: ${mainColor};
        padding: 0;
        box-shadow: none;
        justify-content: unset;
        text-decoration: none;
        display: inline-flex;
        text-decoration: ${isUnderlined ? 'underline' : 'none'};

        :hover,
        :focus {
          background: none;
          color: ${darken(backgroundColor, 10)};
          fill: ${darken(backgroundColor, 10)};
          text-decoration: underline;
        }

        :active {
          background: none;
          color: ${darken(backgroundColor, 20)};
          fill: ${darken(backgroundColor, 20)};
          text-decoration: underline;
        }

        &[disabled] {
          box-shadow: none;
          background: none;
          cursor: default;
          pointer-events: none;
          color: ${lighten(backgroundColor, 10)};
          fill: ${lighten(backgroundColor, 10)};
        }
      `}
  `
})

const Button: React.FC<Props> = ({
  icon,
  text,
  isLoading,
  isDisabled,
  href,
  isLink,
  iconPrefix,
  ...props
}) => {
  return (
    <ButtonWrapper
      aria-label={text || icon}
      {...props}
      href={href}
      as={isLink ? 'a' : 'button'}
      isLink={isLink}
      onMouseUp={() => {
        if (document && document.activeElement && document.activeElement) {
          ;(document.activeElement as HTMLElement).blur()
        }
      }}
      isDisabled={!!(isDisabled || isLoading)}
    >
      {!isLoading && icon && (
        <Icon icon={icon} isPadded={Boolean(text)} prefix={iconPrefix} />
      )}
      {isLoading && icon && (
        <Icon
          icon={'circle-notch'}
          isSpinning
          isPadded={Boolean(text)}
          prefix={iconPrefix}
        />
      )}
      {text}
      {!icon && isLoading && (
        <Icon
          icon={'circle-notch'}
          isSpinning
          isPadded={false}
          isCentre
          prefix={iconPrefix}
        />
      )}
    </ButtonWrapper>
  )
}

export { Button }
