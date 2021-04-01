import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    mainContainer: {
      overflow: 'hidden',
      marginBottom: 204,
    },
    poster: {
      width: 600,
      height: 200,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      '&:first-child': {
        backgroundImage: `url('/images/main/banners/1.jpeg')`,
      },
      '&:last-child': {
        marginLeft: 32,
        backgroundImage: `url('/images/main/banners/2.jpeg')`,
      },
    },
    banner: {
      // width: 200,
      height: 158,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      '&:nth-child(1)': {
        backgroundImage: `url('/images/main/banners/3.jpeg')`,
      },
      '&:nth-child(2)': {
        marginLeft: 24,
        backgroundImage: `url('/images/main/banners/4.jpeg')`,
      },
      '&:nth-child(3)': {
        marginLeft: 24,
        backgroundImage: `url('/images/main/banners/5.jpeg')`,
      },
    },
  })
)
