import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 450,
    },
    item: {
      width: 450,
      padding: 20,
      boxShadow: theme.shadows['1'],
      '&:hover': {
        boxShadow: theme.shadows['4'],
      },
    },
  })
)
