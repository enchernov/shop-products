import { createMuiTheme } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'

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
      contrastText: '#fff',
    },
    secondary: {
      light: primaryRed,
      main: accentRed,
      dark: darkRed,
      contrastText: '#fff',
    },
  },
  typography: {
    h2: {
      fontSize: '1.25rem',
      fontWeight: 900,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 900,
    },
  },
})
