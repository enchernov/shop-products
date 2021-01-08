import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 'auto',
      padding: 20,
      width: 233,
      position: 'relative',
      '&:hover': {
        '& $iconAnimation': {
          opacity: 1,
          transform: 'translateX(0)',
        },
        '& $rating': {
          display: 'none',
        },
        '& $cartButton': {
          display: 'flex',
        },
      },
    },
    category: {
      color: grey[500],
    },
    name: {
      textDecoration: 'none',
      color: grey[900],
      fontWeight: 500,
      '&:hover': {
        color: theme.palette.secondary.main,
      },
    },
    image: {
      width: '100%',
    },
    link: {
      color: grey[500],
      transition: '.1s ease-in-out',
      '&:hover': {
        color: theme.palette.secondary.main,
      },
    },
    slideContainer: {
      width: 32,
      position: 'absolute',
      right: 20,
      top: 20,
    },
    iconAnimation: {
      opacity: 0,
      transition: '.25s ease-in-out',
      transform: 'translateX(-10px)',
      '&:nth-child(2)': {
        transitionDelay: '.125s',
      },
    },
    icon: {
      color: grey[600],
      transition: '.2s ease-in-out',
      '&:hover': {
        color: theme.palette.primary.main,
      },
      cursor: 'pointer',
    },
    rating: {
      '& svg': {
        width: '1.2rem',
        height: '1.2rem',
      },
      display: 'flex',
      transition: '.2s ease-in-out',
    },
    cartButton: {
      display: 'none',
      transition: '.2s ease-in-out',
    },
    actions: {
      minHeight: 30,
    },
  })
)
