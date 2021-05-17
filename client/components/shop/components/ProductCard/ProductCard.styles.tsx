import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme & { name?: string }) =>
  createStyles({
    '@keyframes fadeIn': {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },
    root: {
      opacity: 0,
      animationName: '$fadeIn',
      animationDuration: '1s',
      animationIterationCount: '1',
      animationTimingFunction: 'ease',
      animationFillMode: 'forwards',
      animationDirection: 'normal',
      height: 296,
      padding: 20,
      width: 233,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      transition: '.1s ease-in-out',
      boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
      '&:hover': {
        boxShadow:
          'rgba(76, 175, 79, 0.75) 0px -2px inset, rgba(76, 175, 79, 0.1) 0px 4px 6px -1px, rgba(76, 175, 79, 0.06) 0px 2px 4px -1px',
        '& $iconAnimation': {
          // display: 'block',
          opacity: 1,
          transform: 'translateX(0)',
        },
        // '& $rating': {
        //   display: 'none',
        // },
        // '& $cartButton': {
        //   display: 'flex',
        // },
      },
    },
    name: {
      textDecoration: 'none',
      fontWeight: 400,
      '&:hover': {
        color: theme.palette.secondary.main,
      },
      '& > *': {
        width: 'fit-content',
        borderBottom: '1px dashed #e0e0e0',
        margin: '0 auto',
      },
    },
    imageContainer: {
      height: 180,
      display: 'flex',
      justifyContent: 'center',
    },
    image: {
      height: '100%',
    },
    link: {
      color: theme.palette.primary.contrastText,
      transition: '.05s ease-in-out',
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
      // display: 'none',
      opacity: 0,
      transition: '.1s ease-in-out',
      transform: 'translateX(-10px)',
      '&:nth-child(2)': {
        transitionDelay: '.075s',
      },
    },
    icon: {
      // color: grey[600],
      transition: '.1s ease-in-out',
      '&:hover': {
        color: theme.palette.primary.main,
      },
      cursor: 'pointer',
      color: theme.palette.secondary.main,
    },
    rating: {
      '& svg': {
        width: '1.2rem',
        height: '1.2rem',
      },
      // display: 'none',
      display: 'flex',
      transition: '.1s ease-in-out',
      position: 'absolute',
      top: theme.name == 'Light Theme' ? 171 : 181,
      left: 'calc(50% - 48px)',
    },
    cartButton: {
      display: 'flex',
      // display: 'none',
      transition: '.1s ease-in-out',
    },
    primaryButton: {
      color: theme.palette.primary.main + ' !important',
    },
    actions: {
      minHeight: 30,
    },
    categories: {
      position: 'absolute',
      top: 5,
      left: 5,
    },
    chip: {
      '& > div': {
        border: 'none',
        borderRadius: 0,
        backgroundColor:
          theme.name == 'Light Theme' ? 'rgba(252, 186, 3,0.22)' : '#607d8b',
        height: 'auto',
      },
      '& span': {
        padding: '0 6px',
      },
    },
  })
)
