import React from 'react'
import { connectHits } from 'react-instantsearch-dom'
import { Grid, Typography } from '@material-ui/core'
import { IProductProps } from '@interfaces/shop'
import ProductCard from '@components/shop/components/ProductCard/ProductCard'

const ProductHits = connectHits(({ hits, getCount }) => {
  hits && getCount(hits.length)
  return (
    <Grid container justify={'flex-start'} spacing={3}>
      {hits.map((p: IProductProps, index: number) => (
        <Grid item key={`${p.name}_${index}`}>
          <ProductCard hit={p} />
        </Grid>
      ))}
      {!hits.length && <Typography>Результатов нет</Typography>}
    </Grid>
  )
})

export default ProductHits
