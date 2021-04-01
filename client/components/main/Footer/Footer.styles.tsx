import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: 'hidden',
      position: 'relative',
      left: '-40px',
      top: 0,
      width: '100vw',
      height: 'auto',
      padding: '40px 120px',
      backgroundColor: '#313131',
      maxHeight: 164,
    },
    heading: {
      color: '#fafafa',
    },
    subscribeInput: {
      height: 48,
      width: 200,
      backgroundColor: '#464646',
      color: '#666666',
      border: 'none !important',
      outline: 'none !important',
    },
    subscribeButton: {
      padding: '16px 24px',
      height: 48,
      transition: '.2s ease-in-out',
      color: '#fafafa',
      backgroundColor: '#3c3c3c',
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
      },
    },
    app: {
      cursor: 'pointer',
    },
    link: {
      border: 'none',
      '& svg': {
        color: '#707070',
        transition: '.2s ease-in-out',
        '&:hover': {
          color: '#fafafa',
        },
      },
    },
  })
)
