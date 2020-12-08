import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    input: {
      '& > label': {
        fontSize: '0.9rem',
      },
      '& input': {
        padding: '18px 14px',
      },
    },
    icon: {
      '&:hover': {
        background: 'none',
      },
    },
  })
)
