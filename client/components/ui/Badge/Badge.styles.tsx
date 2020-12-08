import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    badge: {
      '& > span': {
        height: 40,
        width: 40,
        padding: theme.spacing(2),
        border: '5px solid #fff',
        borderRadius: '100%',
      },
    },
  })
)
