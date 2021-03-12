import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    slider: {},
    label: {
      color: theme.palette.background.paper,
      '& > span': {
        borderColor: 'rgba(0,0,0,0.14)',
        borderStyle: 'solid',
        borderWidth: 1,
      },
    },
  })
)
