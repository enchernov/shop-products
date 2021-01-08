import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    button: {
      boxShadow: 'none',
      borderRadius: 0,
      '&:hover': {
        boxShadow: 'none',
      },
    },
  })
)
