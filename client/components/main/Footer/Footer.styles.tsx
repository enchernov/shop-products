import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: 'hidden',
      position: 'relative',
      top: 0,
      margin: 0,
      width: '100vw',
      height: 'auto',
      backgroundColor: '#313131',
      // minHeight: 164,
    },
    heading: {
      color: '#fafafa',
    },
    [theme.breakpoints.down('xs')]: {
      form: {},
      subscribeButton: {
        width: 200,
      },
    },
    form: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
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
