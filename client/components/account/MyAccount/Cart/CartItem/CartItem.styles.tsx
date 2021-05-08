import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 20,
      maxWidth: 550,
      width: '90vw',
      boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
      '&:hover': {
        boxShadow:
          'rgba(76, 175, 79, 0.75) 0px -2px inset, rgba(76, 175, 79, 0.1) 0px 4px 6px -1px, rgba(76, 175, 79, 0.06) 0px 2px 4px -1px',
      },
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
