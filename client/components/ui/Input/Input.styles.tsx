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
        // '&:hover, &:focus, &:active': {
        //   backgroundColor: grey[200],
        // },
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
