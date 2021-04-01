import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loaderLayout: {
      height: '100vh',
      width: '100%',
      margin: 0,
      padding: 0,
      backgroundColor: theme.palette.background.default,
    },
  })
)
