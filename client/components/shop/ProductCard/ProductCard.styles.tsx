import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

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
    name: {
      textDecoration: 'none',
      fontWeight: 400,
      '&:hover': {
        color: theme.palette.secondary.main,
      },
    },
    imageContainer: {
      height: 193,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    link: {
      color: '#212121',
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
      // color: grey[600],
      transition: '.2s ease-in-out',
      '&:hover': {
        color: theme.palette.secondary.main,
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
