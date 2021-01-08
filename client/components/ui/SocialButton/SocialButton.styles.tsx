import { createStyles, makeStyles } from '@material-ui/core/styles'
import { darken } from '@material-ui/core/styles/colorManipulator'

export const useStyles = makeStyles(() =>
  createStyles({
    button: {
      borderRadius: 0,
      padding: 10,
      transition: '.1s ease-in-out',
    },
    facebook: {
      backgroundColor: '#3b5998',
      '&': {
        color: '#FAFAFA',
      },
      '&:hover': {
        backgroundColor: darken('#3b5998', 0.4),
      },
    },
    vk: {
      backgroundColor: '#2787F5',
      '&': {
        color: '#FAFAFA',
      },
      '&:hover': {
        backgroundColor: darken('#2787F5', 0.4),
      },
    },
    instagram: {
      backgroundColor: '#E1306C',
      '&': {
        color: '#FAFAFA',
      },
      '&:hover': {
        backgroundColor: darken('#E1306C', 0.4),
      },
    },
    google: {
      backgroundColor: '#DB4437',
      '&': {
        color: '#FAFAFA',
      },
      '&:hover': {
        backgroundColor: darken('#DB4437', 0.4),
      },
    },
  })
)
