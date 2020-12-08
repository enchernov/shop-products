import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      padding: '0 40px',
      flex: 1,
    },
    logoutLink: {
      cursor: 'pointer',
      color: theme.palette.secondary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    header: {
      padding: '20px 40px',
    },
  })
)
