import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    side: {
      padding: '0 40px',
    },
    categoryLink: {
      marginTop: 8,
    },
    categoryDivider: {
      marginTop: 8,
    },
    categoryIcon: {
      height: 14,
      width: 14,
    },
  })
)
