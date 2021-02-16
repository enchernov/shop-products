import React, { FunctionComponent } from 'react'
import { CircularProgress, Grid } from '@material-ui/core'
import { Link } from '@ui/index'

import { useStyles } from './Loader.styles'

const Loader: FunctionComponent = () => {
  const classes = useStyles()
  return (
    <Grid
      container
      direction={'column'}
      alignItems={'center'}
      justify={'center'}
      spacing={10}
      className={classes.loaderLayout}
    >
      <Grid item>
        <Link href={'/'}>
          <img src={'/images/foodMarket.png'} alt={'FoodMarket'} width={234} />
        </Link>
      </Grid>
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  )
}

export default Loader
