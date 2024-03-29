import { createStyles, makeStyles } from '@material-ui/core/styles'
import { darken } from '@material-ui/core/styles/colorManipulator'

export const useStyles = makeStyles(() =>
  createStyles({
    button: {
      borderRadius: 0,
      border: 'none',
      padding: 10,
      transition: '.1s ease-in-out',
      '&': {
        color: 'white !important',
      },
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
    github: {
      backgroundColor: '#333333',
      '&': {
        color: '#FAFAFA',
      },
      '&:hover': {
        backgroundColor: darken('#333333', 0.4),
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
