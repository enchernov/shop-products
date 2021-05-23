import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      background: theme.palette.primary.main,
      height: 150,
      width: 150,
      borderRadius: '100%',
      fontSize: 48,
      color: 'white',
    },
  })
)
