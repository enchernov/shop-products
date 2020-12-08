import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      boxShadow: 'none',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      margin: theme.spacing(0.5, 1, 0, 0),

      '&:hover': {
        boxShadow: 'none',
        backgroundColor: theme.palette.primary.dark,
      },
    },
  })
)
