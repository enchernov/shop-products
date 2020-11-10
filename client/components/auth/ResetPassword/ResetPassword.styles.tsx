import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: '100%',
      maxWidth: 400,
      '&:not(:last-child)': {
        marginBottom: 10,
      },
    },
    heading: {
      margin: '0 0 20px 0',
    },
    formPaper: {
      padding: 20,
    },
    registerPaper: {
      padding: 20,
    },
    input: {
      marginBottom: 20,
    },
    button: {
      padding: 15,
    },
  })
)
