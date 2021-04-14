import { createStyles, makeStyles } from '@material-ui/core/styles'
import { darken } from '@material-ui/core/styles/colorManipulator'

export const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    side: {
      padding: '0 40px',
    },
    imageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    image: {
      width: 420,
    },
    rating: {
      '& svg': {
        width: '1rem',
        height: '1rem',
      },
      display: 'flex',
    },
    buyButton: {
      color: 'white',
    },
    countInput: {
      width: 100,
      '& > div': {
        marginBottom: 10,
      },
    },
    share: {
      border: 'none !important',
    },
    button: {
      borderRadius: 0,
      border: 'none',
      transition: '.1s ease-in-out',
    },
    facebook: {
      color: '#3b5998',
      '&:hover': {
        color: darken('#3b5998', 0.4),
      },
    },
    pinterest: {
      color: '#C8232C',
      '&:hover': {
        color: darken('#C8232C', 0.4),
      },
    },
    twitter: {
      color: '#00ACEE',
      '&:hover': {
        color: darken('#00ACEE', 0.4),
      },
    },
  })
)
