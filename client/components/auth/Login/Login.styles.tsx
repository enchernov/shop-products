import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      maxWidth: 400,
      '&:not(:last-child)': {
        marginBottom: 20,
      },
    },
    heading: {
      margin: '0 0 40px 0',
    },
    link: {},
    formPaper: {
      padding: 40,
    },
    registerPaper: {
      padding: 10,
    },
    form: {
      marginBottom: 40,
    },
    input: {
      marginBottom: 40,
    },
    button: {
      padding: 20,
      marginBottom: 10,
    },
    error: {
      color: theme.palette.error.main,
    },
  })
)
