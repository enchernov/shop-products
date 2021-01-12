import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'none',
      color: '#212121',
      '&:hover': {
        color: theme.palette.secondary.main,
        textDecoration: 'underline',
      },
    },
  })
)
