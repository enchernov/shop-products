import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: 550,
      width: 'calc(100vw - 80px)',
      position: 'relative',
      padding: 0,
      '&:hover $icon': {
        opacity: 1,
      },
    },
    slide: {
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      transition: '.2s ease-in-out',
      padding: '52px 80px',
    },
    icon: {
      transition: '.2s ease-in-out',
      opacity: 0,
      color: '#fafafa',
      cursor: 'pointer',
      width: 'auto',
      height: '4rem',
      position: 'absolute',
      top: 'calc(50% - 2rem)',
      '&:first-of-type': {
        left: '.5rem',
      },
      '&:last-child': {
        right: '.5rem',
      },
    },
    title: {
      color: 'rgb(255, 211, 77)',
      whiteSpace: 'nowrap',
      fontSize: 70,
      fontWeight: 700,
      width: 'fit-content',
      margin: 0,
      '& *': {
        padding: '28px 0 !important',
      },
    },
    subtitle: {
      color: '#fafafa',
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: 500,
      width: 'fit-content',
      margin: '20px 0',
      // '& *': {
      //   margin: '20px 0',
      // },
    },
    button: {
      border: 'none',
      position: 'absolute',
      bottom: 52,
      padding: '13px 30px',
      color: 'rgb(255, 211, 77)',
      backgroundColor: '#323232',
      fontWeight: 500,
      '&:hover': {
        color: '#323232',
        backgroundColor: 'rgb(255, 211, 77)',
      },
    },
  })
)
