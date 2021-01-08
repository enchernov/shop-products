import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    facebook: {
      '&': {
        backgroundColor: '#3b5998',
        color: theme.palette.primary.contrastText,
        padding: 10,
        marginRight: 10,
      },
    },
    vk: {
      '&': {
        backgroundColor: '#2787F5',
        color: theme.palette.primary.contrastText,
        padding: 10,
        marginRight: 10,
      },
    },
    instagram: {
      '&': {
        backgroundColor: '#E1306C',
        color: theme.palette.primary.contrastText,
        padding: 10,
        marginRight: 10,
      },
    },
    google: {
      '&': {
        backgroundColor: '#DB4437',
        color: theme.palette.primary.contrastText,
        padding: 10,
      },
    },
  })
)
