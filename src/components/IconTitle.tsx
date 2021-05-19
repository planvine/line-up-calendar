import React from 'react'
import styled from 'styled-components'
import { Icon, IconName } from 'components'

export type IconTitleSize = 'default' | 'large'

interface Props {
  icon: IconName
  title: string
  size?: IconTitleSize
}

const IconTitleWrapper = styled.div<{ size: IconTitleSize }>`
  display: flex;
  flex-direction: row;
  fill: ${props => props.theme.colors.mainBackgroundColorComplement};
  margin-bottom: 0.5rem;
  font-size: ${props => (props.size === 'default' ? '0.875rem' : '1rem')};
`

const TitleWrapper = styled.div`
  font-family: ${props => props.theme.font.copy};
  color: ${props => props.theme.colors.mainBackgroundColorComplement};
`

const IconTitle: React.FC<Props> = ({ title, icon, size = 'default' }) => {
  return (
    <IconTitleWrapper size={size}>
      <Icon icon={icon} isPadded={true} />
      <TitleWrapper>{title}</TitleWrapper>
    </IconTitleWrapper>
  )
}

export { IconTitle }
