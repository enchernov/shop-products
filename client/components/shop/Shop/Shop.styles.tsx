import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: '3rem',
    },
    side: {
      padding: '0 40px',
    },
    categoryLink: {
      marginTop: 8,
    },
    activeLink: {
      color: theme.palette.secondary.main,
    },
    categoryDivider: {
      marginTop: 8,
    },
    categoryIcon: {
      height: 14,
      width: 14,
    },
    activeIcon: {
      color: theme.palette.secondary.main,
    },
    hits: {},
    thumb: {
      height: 341,
      width: 257,
      padding: 0,
    },
  })
)
