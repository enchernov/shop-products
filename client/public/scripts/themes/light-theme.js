import { createMuiTheme } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'

const primaryGreen = green[500]
const accentGreen = green.A200
const darkGreen = green[900]
const primaryRed = red[500]
const accentRed = red.A200
const darkRed = red[900]

const errorRed = red[500]

export default createMuiTheme({
  name: 'Light Theme',
  palette: {
    primary: {
      light: accentGreen,
      main: primaryGreen,
      dark: darkGreen,
      contrastText: '#212121',
    },
    secondary: {
      light: primaryRed,
      main: accentRed,
      dark: darkRed,
      contrastText: '#fff',
    },
    error: {
      main: errorRed,
    },
  },
  typography: {
    h1: {
      fontWeight: '700',
      fontSize: '2rem',
    },
    h2: {
      fontWeight: '500',
      fontSize: '1.5rem',
    },
    h3: {
      fontWeight: '400',
      fontSize: '1.2rem',
    },
    h4: {
      fontWeight: '300',
      fontSize: '1rem',
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: '0.875rem',
    },
  },
})
