import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 20,
      boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
    },
    button: {
      color: 'white',
    },
    cardInput: {
      maxWidth: 450,
      width: '66vw',
      fontSize: 18,
      padding: '.5rem .25rem',
    },
    item: {
      maxWidth: 450,
      width: '66vw',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#e0e0e0',
      backgroundColor: 'transparent',
      backdropFilter: 'blur(.1rem)',
    },
  })
)
