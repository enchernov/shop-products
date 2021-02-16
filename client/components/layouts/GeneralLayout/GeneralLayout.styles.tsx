import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      padding: '0 40px',
      flex: 1,
    },
    linkStyle: {
      cursor: 'pointer',
      textDecoration: 'none',
      color: theme.palette.primary.contrastText,
      '&:hover': {
        color: theme.palette.secondary.main,
        // textDecoration: 'underline',
      },
    },
    header: {
      padding: '20px 40px',
      fontWeight: 500,
    },
  })
)
