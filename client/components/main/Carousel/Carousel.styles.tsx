import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: 550,
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
    contents: {
      position: 'absolute',
      maxWidth: 400,
      width: '66vw',
      left: 80,
      // top: 70,
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
      fontSize: 70,
      lineHeight: '80px',
      fontWeight: 700,
      margin: 0,
    },
    subtitle: {
      color: '#fafafa',
      fontSize: '1.2rem',
      lineHeight: '2rem',
      fontWeight: 400,
      margin: '20px 0',
    },
    button: {
      border: 'none',
      position: 'absolute',
      // bottom: 52,
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
