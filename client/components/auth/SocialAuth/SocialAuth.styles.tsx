import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    services: {
      // marginBottom: 40,
    },
    facebook: {
      '&': {
        color: '#3b5998',
      },
    },
    vk: {
      '&': {
        color: '#2787F5',
      },
    },
    twitter: {
      '&': {
        color: '#00acee',
      },
    },
    google: {
      '&': {
        color: '#DB4437',
      },
    },
  })
)
