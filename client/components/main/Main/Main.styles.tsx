import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      overflow: 'hidden',
      marginBottom: '3rem',
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
    contents: {
      width: 'calc(100% - 100px)',
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
