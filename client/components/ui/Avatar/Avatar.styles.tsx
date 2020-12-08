import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      width: 30,
      height: 30,
      fontSize: '1rem',
    },
  })
)
