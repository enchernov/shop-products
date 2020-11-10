import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      background: theme.palette.secondary.main,
      color: theme.palette.primary.contrastText,
    },
  })
)
