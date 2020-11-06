import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    button: {
      fontSize: '0.7rem',
      boxShadow: 'none',
      borderRadius: 0,
      '&:hover': {
        boxShadow: 'none',
      },
    },
  })
)
