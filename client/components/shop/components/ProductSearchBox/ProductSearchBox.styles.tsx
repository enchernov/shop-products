import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    root: {
      transition: 'ease-in-out .2s',
      minWidth: 400,
      color: theme.palette.primary.contrastText,
      fontWeight: 300,
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 0,
      borderColor: 'rgba(0,0,0,0.14)',
      padding: '14px 16px 15px 24px',
      backgroundColor: theme.palette.background.paper,
      '&:focus': {
        outline: 'none',
        borderColor: green[100],
      },
    },
    icon: {
      color: green[300],
      right: 12,
      position: 'absolute',
      userSelect: 'none',
      pointerEvents: 'none',
      zIndex: 100,
    },
  })
)
