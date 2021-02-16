import React, { useState } from 'react'
import { connectRange } from 'react-instantsearch-dom'
import { Grid, Slider, Typography } from '@material-ui/core'
import { IconButton } from '@ui/index'
// import * as _ from 'lodash'

const PriceRange = connectRange(
  ({ refine, canRefine, currentRefinement, min, max }) => {
    const [priceRange, setPriceRange] = React.useState<number[]>([min, max])
    const handlePriceRange = (event: any, newValue: number | number[]) => {
      // setPriceRange(newValue as number[])
      if ([currentRefinement.min, currentRefinement.max] !== newValue) {
        refine({ min: newValue[0], max: newValue[1] })
        setPriceRange(newValue as number[])
      }
    }
    // React.useEffect(() => {
    //   if (canRefine) {
    //     setPriceRange([currentRefinement.min, currentRefinement.max])
    //   }
    // }, [currentRefinement.min, currentRefinement.max, canRefine])

    const [showX, setShowX] = useState<boolean>(
      [currentRefinement.min, currentRefinement.max] !== [min, max]
    )

    const reset = () => {
      refine({ min, max })
      setPriceRange([min, max])
      setShowX(false)
    }

    return (
      <>
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
        <Grid>
          <Slider
            value={priceRange}
            onChangeCommitted={handlePriceRange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={min}
            max={max}
          />
        </Grid>
      </>
    )
  }
)

export default PriceRange
