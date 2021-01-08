import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    loaderLayout: {
      height: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
    },
  })
)
