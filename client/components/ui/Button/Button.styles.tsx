import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    button: {
      color: 'white',
      boxShadow: 'none',
      borderRadius: 0,
      // color: 'white',
      '&:hover': {
        boxShadow: 'none',
      },
    },
  })
)
