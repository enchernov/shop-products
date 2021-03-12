import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '20px 0',
      maxWidth: 300,
    },
    image: {
      width: 80,
      height: 80,
    },
    icon: {
      width: '0.5rem',
      height: '0.5rem',
      transition: '.2s ease-in-out',
      '&:hover': {
        color: theme.palette.secondary.main,
      },
      cursor: 'pointer',
    },
    productMini: {
      paddingRight: 12,
    },
  })
)
