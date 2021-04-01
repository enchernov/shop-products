import { createMuiTheme } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'

export default createMuiTheme({
  name: 'Dark Theme',
  palette: {
    type: 'dark',
    primary: {
      light: '#ffff9f',
      main: '#f7e06e',
      dark: '#c2ae3e',
      contrastText: '#fafafa',
    },
    secondary: {
      light: '#ff9fa5',
      main: '#f36d76',
      dark: '#bc3c4a',
      contrastText: '#fafafa',
    },
    background: {
      default: grey[800],
      paper: '#53586a',
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
      color: grey[100],
    },
    body2: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: 300,
      color: grey[100],
    },
    caption: {
      fontWeight: '700',
      fontSize: '2rem',
      color: grey[100],
      letterSpacing: '0.7px',
      textTransform: 'uppercase',
    },
    h1: {
      fontWeight: '700',
      fontSize: '1.5rem',
      color: grey[100],
    },
    h2: {
      fontWeight: '500',
      fontSize: '1.2rem',
      color: grey[100],
    },
    h3: {
      fontWeight: '500',
      fontSize: '1.1rem',
      color: grey[100],
    },
    h4: {
      fontWeight: '400',
      fontSize: '1.1rem',
      color: grey[100],
    },
    h5: {
      fontWeight: '300',
      fontSize: '1.1rem',
      color: grey[100],
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 400,
      color: grey[100],
    },
  },
})
