import { createMuiTheme } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import purple from '@material-ui/core/colors/purple'
import { grey } from '@material-ui/core/colors'

const primaryGreen = green[500]
const accentGreen = green.A200
const darkGreen = green[900]
const primaryPurple = purple[500]
const accentPurple = purple.A200
const darkPurple = purple[900]

export default createMuiTheme({
  name: 'Dark Theme',
  palette: {
    type: 'dark',
    primary: {
      light: accentPurple,
      main: primaryPurple,
      dark: darkPurple,
      contrastText: '#fff',
    },
    secondary: {
      light: accentGreen,
      main: primaryGreen,
      dark: darkGreen,
      contrastText: '#000',
    },
    background: {
      default: grey[900],
      paper: grey[800],
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
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    body1: {
      fontSize: '0.875rem',
      lineHeight: '0.875rem',
      fontWeight: 300,
      color: 'white',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: '0.875rem',
      fontWeight: 300,
      color: 'white',
    },
    h1: {
      fontWeight: '700',
      fontSize: '1.2rem',
      color: 'white',
    },
    h2: {
      fontWeight: '500',
      fontSize: '1.2rem',
      color: 'white',
    },
    h3: {
      fontWeight: '500',
      fontSize: '1.1rem',
      color: 'white',
    },
    h4: {
      fontWeight: '400',
      fontSize: '1.1rem',
      color: 'white',
    },
  },
})
