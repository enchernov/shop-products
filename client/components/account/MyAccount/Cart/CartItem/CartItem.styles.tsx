import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 20,
    },
    image: {
      width: 150,
      height: 150,
    },
    link: {},
    name: {},
    icon: {
      transition: '.2s ease-in-out',
      '&:hover': {
        color: theme.palette.secondary.main,
      },
      cursor: 'pointer',
    },
    countInput: {
      width: 100,
      // textAlign: 'center',
    },
  })
)
