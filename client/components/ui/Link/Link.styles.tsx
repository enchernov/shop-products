import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',

      '&:hover': {
        textDecoration: 'underline',
      },
    },
  })
)
