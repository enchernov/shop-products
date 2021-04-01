import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
    },
    root: {},
    summary: {
      maxHeight: 48,
      minHeight: 'auto !important',
      // height: 48,
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      color: theme.palette.primary.contrastText,
      fontWeight: 500,
      fontSize: '1rem',
    },
    icon: {
      '& svg': {
        width: '1rem',
        height: '1rem',
      },
    },
  })
)
