import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      maxWidth: 420,
      '&:not(:last-child)': {
        marginBottom: 20,
      },
    },
    heading: {
      marginBottom: '1rem',
    },
    serviceHeading: {
      marginBottom: 20,
      marginTop: 0,
    },
    formPaper: {
      padding: '24px 40px',
      boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
    },
    loginPaper: {
      padding: 20,
      boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
    },
    input: {
      marginBottom: 30,
    },
    input_error: {
      marginBottom: 8,
    },
    button: {
      padding: 15,
      marginBottom: 20,
      color: 'white',
    },
    error: {
      color: theme.palette.error.main,
      minHeight: 20,
      margin: '0 0 10px 0',
      width: '100%',
      textAlign: 'center',
    },
  })
)
