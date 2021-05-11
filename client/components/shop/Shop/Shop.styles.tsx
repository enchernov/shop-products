import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headline: {
      width: '100%',
      paddingBottom: 20,
    },
    root: {
      marginBottom: '3rem',
      flexGrow: 1,
      display: 'flex',
      marginTop: 20,
      paddingBottom: 40,
    },
    side: {
      padding: '0 20px',
    },
    categoryLink: {
      marginTop: 8,
    },
    activeLink: {
      color: theme.palette.secondary.main,
    },
    categoryDivider: {
      marginTop: 8,
    },
    categoryIcon: {
      height: 14,
      width: 14,
    },
    activeIcon: {
      color: theme.palette.secondary.main,
    },
    hits: {},
    thumb: {
      height: 341,
      width: 257,
      padding: 0,
    },
    cartIcon: {
      borderRadius: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 48,
      height: 48,
      position: 'fixed',
      bottom: 88,
      right: 20,
      transition: '.1s ease-in-out',
      backgroundColor: theme.palette.primary.main,
      color: '#fafafa',
      zIndex: theme.zIndex.drawer + 10,
      boxShadow:
        'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        color: '#fafafa',
      },
      '& span.MuiBadge-badge': {
        color: 'white',
      },
    },
  })
)
