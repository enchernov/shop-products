import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    input: {
      '& > label': {
        fontSize: '0.8rem',
      },
      '& > div': {
        borderRadius: 0,
      },
      '& > div > input': {
        padding: '16px 14px',
      },
      '& + p': {
        height: 0,
      },
    },
  })
)
