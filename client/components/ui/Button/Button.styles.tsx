import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    button: {
      // color: 'white !important',
      boxShadow: 'none',
      borderRadius: 0,
      border: 'none !important',
      // color: 'white',
      '&:hover': {
        boxShadow:
          'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
      },
    },
  })
)
