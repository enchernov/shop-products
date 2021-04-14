import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      marginTop: 20,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
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
      // color: theme.palette.primary.contrastText,
    },
    cancelButton: {
      // color: theme.palette.primary.contrastText,
    },
    redButton: {
      color: theme.palette.secondary.main + ' !important',
    },
    error: {
      color: theme.palette.error.main,
      minHeight: 20,
      margin: '0 0 10px 0',
      width: '100%',
      textAlign: 'center',
    },
    form: {
      maxWidth: 360,
    },
    passwordLabel: {
      width: '100%',
      textAlign: 'center',
      margin: '0 0 20px 0',
    },
  })
)
