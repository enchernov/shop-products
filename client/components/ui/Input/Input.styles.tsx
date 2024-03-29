import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

// import grey from '@material-ui/core/colors/grey'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      '& > label': {
        fontSize: '0.8rem',
      },
      '& > div': {
        borderRadius: 0,
        backgroundColor: theme.palette.background.paper,
      },
      '& > div > input': {
        padding: '16px 14px',
      },
      '& + p': {
        height: 0,
      },
      '& > p': {
        fontSize: '0.875rem',
      },
    },
  })
)
