import 'styled-components'
import { LineUpTheme } from './line-up'

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string
    font: {
      copy: string
      button: string
      header: string
      input: string
    }
    colors: {
      headingColor: string
      copyColor: string
      borderColor: string

      mainColor: string // Main accent color e.g. buttons
      mainColorComplement: string

      secondaryColor: string // Secondary accent color e.g. secondary button
      secondaryColorComplement: string

      alertColor: string // Alert color e.g. error state
      accentColor: string //

      mainBackgroundColor: string // Main background e.g. behind tile text
      mainBackgroundColorComplement: string

      secondaryBackgroundColor: string // Alternative background colour
      secondaryBackgroundColorComplement: string
    }
  }
}

const getCustomTheme = (
  mainColor: string | null,
  backgroundColor?: string | null
) => {
  return {
    ...LineUpTheme,
    colors: {
      ...LineUpTheme.colors,
      ...(mainColor && { accentColor: mainColor }),
      ...(backgroundColor && { mainBackgroundColor: backgroundColor }),
    },
  }
}

export { getCustomTheme }
