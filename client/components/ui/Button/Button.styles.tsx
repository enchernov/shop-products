import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      boxShadow: 'none',
      color: theme.palette.primary.contrastText,
      borderRadius: 0,
      '&:hover': {
        boxShadow: 'none',
      },
    },
  })
)
