const breakpoints = [
  '599px', // phone
  '768px', // miniTablet
  '1024px', // tablet
  '1440px', // desktop
  '1800px', // wide
  '2400px', // ultraWide
]

export const theme = {
  borderRadius: '4px',
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
  colors: {
    white: '#ffffff',
    black: '#000',
    header: '#f9f9f9;',
    borders: '#ccc',
    checkBox: '#00287f;',
    green: '#146903',
    headerColor: '#134a00;',
  },
  breakpoints,
  mediaQueries: {
    phone: `@media screen and (max-width: ${breakpoints[0]})`,
    miniTablet: `@media screen and (min-width: ${breakpoints[0]}) and (max-width: ${breakpoints[1]})`,
    tablet: `@media screen and (min-width: ${breakpoints[1]}) and (max-width: ${breakpoints[2]})`,
    laptop: `@media screen and (min-width: ${breakpoints[2]}) and (max-width: ${breakpoints[3]})`,
    desktop: `@media screen and (min-width: ${breakpoints[3]}) and (max-width: ${breakpoints[4]})`,
    wide: `@media screen and (min-width: ${breakpoints[4]}) and (max-width: ${breakpoints[5]})`,
    ultraWide: `@media screen and (min-width: ${breakpoints[5]})`,
  },
}
