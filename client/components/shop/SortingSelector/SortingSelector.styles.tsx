import { createStyles, makeStyles } from '@material-ui/core/styles'

import { green, grey } from '@material-ui/core/colors'

export const useStyles = makeStyles(() =>
  createStyles({
    select: {
      minWidth: 200,
      background: 'white',
      color: grey[900],
      fontWeight: 300,
      borderStyle: 'none',
      borderWidth: 2,
      // borderRadius: 12,
      paddingLeft: 24,
      paddingTop: 14,
      paddingBottom: 15,
      boxShadow: '0px 5px 8px -3px rgba(0,0,0,0.14)',
      '&:focus': {
        // borderRadius: 12,
        background: 'white',
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
      // borderRadius: 12,
      marginTop: 8,
    },
    list: {
      paddingTop: 0,
      paddingBottom: 0,
      background: 'white',
      '& li': {
        fontWeight: 300,
        paddingTop: 12,
        paddingBottom: 12,
      },
      '& li:hover': {
        background: green[100],
      },
      '& li.Mui-selected': {
        color: 'white',
        background: green[400],
      },
      '& li.Mui-selected:hover': {
        background: green[500],
      },
    },
  })
)
