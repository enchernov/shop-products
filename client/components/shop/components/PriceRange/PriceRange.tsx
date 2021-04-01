import React from 'react'
import { connectRange } from 'react-instantsearch-dom'
import { Grid, Typography } from '@material-ui/core'
import { IconButton, Slider } from '@ui/index'

const PriceRange = connectRange(({ refine, currentRefinement, min, max }) => {
  const [priceRange, setPriceRange] = React.useState<number[]>([min, max])
  const handlePriceRange = (_: any, newValue: number | number[]) => {
    if (
      currentRefinement.min !== newValue[0] ||
      currentRefinement.max !== newValue[1]
    ) {
      refine({ min: newValue[0], max: newValue[1] })
      setPriceRange(newValue as number[])
    }
  }

  const showX = currentRefinement.min !== min || currentRefinement.max !== max

  const reset = () => {
    refine({ min, max })
    setPriceRange([min, max])
  }

  return (
    <Grid container direction={'column'} spacing={6}>
      <Grid item>
        <Grid container justify={'space-between'} alignItems={'center'}>
          <Grid item>
            <Typography variant={'h3'}>Цена</Typography>
          </Grid>
          {showX ? (
            <Grid item>
              <IconButton icon={'cross'} onClick={reset} />
            </Grid>
          ) : null}
        </Grid>
      </Grid>
      <Grid item>
        <Slider
          value={priceRange}
          onChangeCommitted={handlePriceRange}
          valueLabelDisplay={'on'}
          aria-labelledby="range-slider"
          min={min}
          max={max}
        />
      </Grid>
    </Grid>
  )
})

export default PriceRange
