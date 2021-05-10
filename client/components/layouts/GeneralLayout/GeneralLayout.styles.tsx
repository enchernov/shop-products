import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { grey, indigo, yellow } from '@material-ui/core/colors'

export const useStyles = makeStyles((theme: Theme & { name: string }) =>
  createStyles({
    root: {
      position: 'relative',
      padding: '0 20px',
      flex: 1,
      minHeight: '100vh',
      overflow: 'hidden',
    },
    header: {
      padding: '24px 40px',
      // minHeight: 72,
      fontWeight: 500,
    },
    logo: {
      height: 24,
    },
    link: {
      fontSize: '.875rem',
      color:
        theme.name === 'Dark Theme'
          ? grey[200]
          : theme.palette.primary.contrastText,
    },
    linkStyle: {
      cursor: 'pointer',
      textDecoration: 'none',
      fontSize: '.875rem',
      borderBottom: '1px dashed #e0e0e0',
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
      position: 'relative',
      color: '#fafafa',
      backgroundColor: '#212121',
    },
    copyright: {
      padding: '16px 0',
    },
    scrollUp: {
      width: 48,
      height: 48,
      position: 'fixed',
      bottom: 20,
      right: 20,
      transition: '.1s ease-in-out',
      backgroundColor: theme.palette.secondary.light,
      color: '#fafafa',
      zIndex: theme.zIndex.drawer + 10,
      boxShadow:
        'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        color: '#fafafa',
      },
    },
  })
)
