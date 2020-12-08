import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      width: '100%',
      maxWidth: 360,
      marginBottom: theme.spacing(1),
      fontWeight: 900,
      background: '#e4e4e4',
      borderRadius: 4,
      '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.contrastText,
        },
        '&:hover .MuiListItemIcon-root': {
          color: theme.palette.primary.contrastText,
        },
      },
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
      },
      '&:hover .MuiListItemIcon-root': {
        color: theme.palette.primary.contrastText,
      },
    },
    icon: {
      '&.MuiListItemIcon-root': {
        color: theme.palette.primary.contrastText,
      },
    },
  })
)
