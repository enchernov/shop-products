import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { green } from '@material-ui/core/colors'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      minWidth: 200,
      color: theme.palette.primary.contrastText,
      fontWeight: 300,
      // borderStyle: 'none',
      // borderWidth: 2,
      // borderRadius: 0,
      paddingLeft: 24,
      paddingTop: 14,
      paddingBottom: 15,
      // boxShadow: '0px 5px 8px -3px rgba(0,0,0,0.14)',
      backgroundColor: theme.palette.background.paper,
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 0,
      borderColor: 'rgba(0,0,0,0.14)',
      '&:focus': {
        backgroundColor: theme.palette.background.paper,
        borderColor: green[100],
      },
    },
    menuItem: {
      borderRadius: 0,
    },
    icon: {
      color: green[300],
      right: 12,
      position: 'absolute',
      userSelect: 'none',
      pointerEvents: 'none',
    },
    paper: {
      borderRadius: 0,
      marginTop: 8,
    },
    list: {
      paddingTop: 0,
      paddingBottom: 0,
      backgroundColor: theme.palette.background.paper,
      '& li': {
        fontWeight: 300,
        paddingTop: 12,
        paddingBottom: 12,
      },
      '& li:hover': {
        backgroundColor: green[200],
      },
      '& li.Mui-selected': {
        color: '#FAFAFA',
        backgroundColor: green[400],
      },
      '& li.Mui-selected:hover': {
        backgroundColor: green[500],
      },
    },
  })
)
