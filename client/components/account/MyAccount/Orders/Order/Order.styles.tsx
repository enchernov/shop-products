import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 'auto',
      width: 'auto',
      padding: 20,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows['1'],
      '&:hover': {
        boxShadow: theme.shadows['4'],
      },
    },
  })
)
