import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'none',
      borderBottom: '1px dashed #e0e0e0',
      color: theme.palette.primary.contrastText,
      '&:hover': {
        color: theme.palette.secondary.main,
        // textDecoration: 'underline',
      },
    },
  })
)
