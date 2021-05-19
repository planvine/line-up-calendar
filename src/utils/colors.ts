import tinycolor from 'tinycolor2'

export const lighten = (color: string, amount: number) =>
  tinycolor(color).lighten(amount).toString()

export const darken = (color: string, amount: number) =>
  tinycolor(color).darken(amount).toString()

export const rgbPartToHex = (rgbPart: string) => {
  let hexString = Number(rgbPart).toString(16)
  if (hexString.length < 2) {
    hexString = '0' + hexString
  }
  return hexString
}

export const rgbToHex = (rgbString: string) => {
  const rgbParts = rgbString.split(',')
  return `#${rgbPartToHex(rgbParts[0])}${rgbPartToHex(
    rgbParts[1]
  )}${rgbPartToHex(rgbParts[2])}`
}
