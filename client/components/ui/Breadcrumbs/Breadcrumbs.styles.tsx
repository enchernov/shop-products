import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    breadcrumbs: {
      '& li': {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
      '& a': {
        color: theme.palette.primary.contrastText,
        '&:hover': {
          color: theme.palette.secondary.main,
        },
      },
    },
    current: {
      color: theme.palette.secondary.main + ' !important',
    },
  })
)
