import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headline: {
      width: '100%',
      paddingBottom: 20,
    },
    mainContainer: {
      overflow: 'hidden',
      marginBottom: '3rem',
      flexGrow: 1,
      display: 'flex',
      marginTop: 40,
      paddingBottom: 40,
    },
    contactContanier: {
      padding: 16,
      '& img': {
        width: '100%',
      },
    },
    heading: {
      textTransform: 'uppercase',
      letterSpacing: '.2px',
    },
    subHeading: {
      maxWidth: 450,
      width: '66vw',
      margin: 'auto',
    },
    root: {
      height: 400,
      width: 'calc(100vw - 160px)',
      position: 'relative',
      padding: 0,
      margin: 'auto',
    },
    title: {
      color: 'white',
      fontSize: 42,
      fontWeight: 500,
      margin: 0,
    },
    subtitle: {
      color: '#fafafa',
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: 400,
      margin: '20px 0',
    },
    button: {
      border: 'none',
      // position: 'absolute',
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
    slide: {
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      transition: '.2s ease-in-out',
    },
    contents: {
      position: 'absolute',
      maxWidth: 450,
      width: '66vw',
      right: 40,
      top: 70,
    },
    poster: {
      width: '100%',
      maxWidth: 600,
      height: 200,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      '&:first-child': {
        alignItems: 'flex-start',
        backgroundImage: `url('/images/main/banners/1.jpeg')`,
      },
      '&:last-child': {
        alignItems: 'flex-end',
        backgroundImage: `url('/images/main/banners/2.jpeg')`,
      },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: '60px 40px',
      '& h1': {
        color: grey[900],
        fontSize: '1.5rem',
        marginBottom: '.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.3px',
      },
      '& h2': {
        fontSize: '1.25rem',
        marginBottom: '.5rem',
        color: theme.palette.secondary.main,
      },
      '& > a > p': {
        color: grey[900],
      },
    },
    banner: {
      width: '100%',
      minHeight: 158,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      paddingLeft: 30,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      '&:nth-child(1)': {
        backgroundImage: `url('/images/main/banners/3.jpeg')`,
      },
      '&:nth-child(2)': {
        backgroundImage: `url('/images/main/banners/4.jpeg')`,
      },
      '&:nth-child(3)': {
        backgroundImage: `url('/images/main/banners/5.jpeg')`,
      },
      '& h1': {
        color: 'white',
        fontSize: 30,
        marginBottom: '.2rem',
      },
      '& a': {
        color: 'rgb(255, 211, 77)',
        border: 'none',
        fontWeight: 500,
      },
    },
    review: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      padding: '40px 32px',
    },
    reviewer: {
      marginRight: '1.5rem',
      width: 65,
      height: 65,
      borderRadius: '100%',
    },
    quote: {
      '& > p::before': {
        content: `'\\201C'`,
        margin: '0 8px -20px 0',
        fontSize: 40,
        // lineHeight: 40,
        float: 'left',
        color: theme.palette.secondary.main,
      },
    },
    author: {
      '& h4': {
        marginBottom: '.2rem',
        color: theme.palette.secondary.main,
      },
    },
  })
)
