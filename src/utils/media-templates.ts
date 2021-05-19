export const mediaQuery = (maxWidth: number) => `(max-width: ${maxWidth}px)`
export const DESKTOP_BREAKPOINT = 922
export const TABLET_BREAKPOINT = 800
export const MOBILE_BREAKPOINT = 576

export const media = {
  custom: mediaQuery,
  desktop: `@media ${mediaQuery(DESKTOP_BREAKPOINT)}`,
  tablet: `@media ${mediaQuery(TABLET_BREAKPOINT)}`,
  phone: `@media ${mediaQuery(MOBILE_BREAKPOINT)}`,
}
