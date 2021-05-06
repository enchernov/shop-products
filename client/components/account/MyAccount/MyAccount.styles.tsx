import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    headline: {
      width: '100%',
      paddingBottom: 20,
    },
    root: {
      flexGrow: 1,
      display: 'flex',
      marginTop: 20,
    },
    tab: {
      '& > span.MuiTab-wrapper': {
        flexDirection: 'row',
        '& > svg.MuiSvgIcon-root': {
          width: '1.25rem',
          height: '1.25rem',
          marginBottom: 0,
          marginRight: 6,
        },
      },
    },
  })
)
