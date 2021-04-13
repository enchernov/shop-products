import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      height: 'auto',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.contrastText,
    },
  })
)
