import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headline: {
      width: '100%',
      padding: '20px 0',
    },
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      marginTop: 20,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  })
)
