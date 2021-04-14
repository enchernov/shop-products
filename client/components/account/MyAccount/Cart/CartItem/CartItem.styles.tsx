import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 20,
      maxWidth: 550,
      width: '90vw',
    },
    image: {
      width: 150,
      height: 150,
    },
    link: {},
    name: {
      '& > *': {
        width: 'fit-content',
        borderBottom: '1px dashed #e0e0e0',
      },
    },
    icon: {
      transition: '.2s ease-in-out',
      '&:hover': {
        color: theme.palette.secondary.main,
      },
      cursor: 'pointer',
    },
    countInput: {
      width: 100,
      '& > div': {
        marginBottom: 10,
      },
      // textAlign: 'center',
    },
  })
)
