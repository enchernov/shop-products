import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '20px 0',
      // minWidth: 300,
      boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
      '&:hover': {
        boxShadow:
          'rgba(76, 175, 79, 0.75) 0px -2px inset, rgba(76, 175, 79, 0.1) 0px 4px 6px -1px, rgba(76, 175, 79, 0.06) 0px 2px 4px -1px',
        '& $icon:nth-child(1)': {
          opacity: 1,
        },
      },
    },
    image: {
      width: 80,
      height: 80,
    },
    icon: {
      position: 'absolute',
      right: 20,
      width: '0.5rem',
      height: '0.5rem',
      transition: '.1s ease-in-out',
      '&:hover': {
        color: theme.palette.secondary.main,
      },
      cursor: 'pointer',
      '&:nth-child(1)': {
        opacity: 0,
        top: 0,
      },
      '&:nth-child(2)': {
        bottom: 0,
      },
    },
    productMini: {
      position: 'relative',
      // paddingRight: 24,
    },
    link: {
      width: 'fit-content',
      borderBottom: '1px dashed #e0e0e0',
    },
    button: {
      color: 'white',
      textAlign: 'center',
      border: 'none',
      '&:hover': {
        color: 'white',
      },
    },
    badge: {
      '& > span': {
        top: 11,
        right: '-20px',
      },
    },
  })
)
