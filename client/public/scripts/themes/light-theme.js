import { createMuiTheme } from '@material-ui/core/styles'
import { green, red, grey } from '@material-ui/core/colors'

const primaryGreen = green[500]
const accentGreen = green.A200
const darkGreen = green[900]
const primaryRed = red[500]
const accentRed = red.A200
const darkRed = red[900]

export default createMuiTheme({
  name: 'Light Theme',
  palette: {
    primary: {
      light: accentGreen,
      main: primaryGreen,
      dark: darkGreen,
      contrastText: '#000',
    },
    secondary: {
      light: primaryRed,
      main: accentRed,
      dark: darkRed,
      contrastText: '#fff',
    },
    background: {
      default: grey[50],
      paper: 'white',
    },
  },
  typography: {
    fontFamily: [
      // 'Helvetica',
      // 'Nimbus Sans L',
      // '-apple-system',
      // 'BlinkMacSystemFont',
      // '"Segoe UI"',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
    ].join(','),
    body1: {
      fontSize: '0.875rem',
      lineHeight: '0.875rem',
      fontWeight: 300,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: '0.875rem',
      fontWeight: 300,
      color: grey[600],
    },
    h1: {
      fontWeight: '700',
      fontSize: '1.2rem',
      color: grey[900],
    },
    h2: {
      fontWeight: '500',
      fontSize: '1.2rem',
      color: grey[900],
    },
    h3: {
      fontWeight: '500',
      fontSize: '1.1rem',
      color: grey[900],
    },
    h4: {
      fontWeight: '400',
      fontSize: '1.1rem',
      color: grey[900],
    },
    h5: {
      fontWeight: '300',
      fontSize: '1.1rem',
      color: grey[900],
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 400,
      color: grey[900],
    },
  },
})
