import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    divider: {
      border: 'none',
      backgroundColor: '#f6f6f6',
    },
    thin: {
      height: 2,
    },
    regular: {
      height: 3,
    },
    wide: {
      height: 6,
    },
    solid: {
      borderStyle: 'solid',
    },
    dotted: {
      borderStyle: 'dotted',
    },
    dashed: {
      borderStyle: 'dashed',
    },
    double: {
      borderStyle: 'double',
    },
    groove: {
      borderStyle: 'groove',
    },
    none: {
      borderStyle: 'none',
    },
  })
)
