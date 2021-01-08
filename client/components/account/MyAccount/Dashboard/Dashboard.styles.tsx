import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: 150,
      height: 150,
      backgroundColor: theme.palette.primary.main,
      fontSize: 48,
      fontWeight: 500,
    },
    input: {
      display: 'none',
    },
    icon: {
      padding: 4,
      color: 'white',
    },
    progress: {
      color: '#FFFFFF',
    },
  })
)
