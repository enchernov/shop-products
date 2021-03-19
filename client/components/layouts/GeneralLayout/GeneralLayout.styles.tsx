import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { grey, indigo, yellow } from '@material-ui/core/colors'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      padding: '0 40px',
      flex: 1,
      minHeight: '100vh',
    },
    header: {
      padding: '24px 40px',
      maxHeight: 72,
      fontWeight: 500,
    },
    logo: {
      height: 24,
    },
    link: {
      color:
        theme.name === 'Dark Theme'
          ? grey[200]
          : theme.palette.primary.contrastText,
    },
    linkStyle: {
      cursor: 'pointer',
      textDecoration: 'none',
      color:
        theme.name === 'Dark Theme'
          ? grey[200]
          : theme.palette.primary.contrastText,
      '&:hover': {
        color: theme.palette.secondary.main,
      },
    },
    themeIcon: {
      transition: '.2s ease-in-out',
      '& svg': {
        width: '1rem',
        height: '1rem',
      },
    },
    sun: {
      color: theme.name === 'Light Theme' ? yellow[500] : grey[200],
      '&:hover': {
        color: yellow[500],
      },
    },
    moon: {
      color: theme.name === 'Dark Theme' ? indigo[500] : 'inherit',
      '&:hover': {
        color: indigo[500],
      },
    },
    footer: {
      padding: '16px 40px',
    },
  })
)
