import React, { FunctionComponent, useContext, useState } from 'react'
import { Grid, Slider, Typography } from '@material-ui/core'
import { CategoryOutlined } from '@material-ui/icons'

import { Link, Divider } from '@ui/index'

import { ICategoryProps } from '@interfaces/shop'

import { ShopContext } from '@providers/ShopProvider'

import SortingSelector from '@components/shop/components/SortingSelector'

import { useStyles } from './Shop.styles'

import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-dom'
import ProductHits from '@components/shop/components/ProductHits'
import ProductSearchBox from '@components/shop/components/ProductSearchBox'
import Menu from '@components/shop/components/Menu'
import PriceRange from '@components/shop/components/PriceRange'

const indexName = 'dev_PRODUCTS'

const searchClient = algoliasearch(
  'AQACOGUA51',
  'b02a6b02a41eb2da855e9e6723e4691c'
)

const Shop: FunctionComponent = () => {
  const classes = useStyles()
  const { state } = useContext(ShopContext)
  const [count, setCount] = useState<number>(0)
  const getCount = (v: number) => setCount(v)

  return (
    <InstantSearch indexName={indexName} searchClient={searchClient}>
      <Grid
        container
        alignItems={'flex-start'}
        justify={'space-between'}
        spacing={4}
      >
        <Grid item xs={9}>
          <Grid container direction={'column'} spacing={4}>
            <Grid item>
              <Grid container alignItems={'center'} justify={'space-between'}>
                <Grid item>
                  <SortingSelector
                    defaultRefinement="products_publishing_date"
                    items={[
                      { value: 'products_publishing_date', label: 'Новинки' },
                      {
                        value: 'products_price_asc',
                        label: `По цене вверх`,
                      },
                      {
                        value: 'products_price_desc',
                        label: 'По цене вниз',
                      },
                      {
                        value: 'products_rating',
                        label: 'По рейтингу',
                      },
                    ]}
                  />
                </Grid>
                <Grid item>
                  <ProductSearchBox />
                </Grid>
                <Grid item>
                  <Typography variant={'body2'}>
                    Результатов:&nbsp;{count}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <ProductHits getCount={getCount} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid
            container
            className={classes.side}
            direction={'column'}
            spacing={3}
          >
            <Menu attribute={'categories.name'} />
            <PriceRange
              attribute={'price'}
              defaultRefinement={{
                min: 0,
                max: 500,
              }}
              min={0}
              max={500}
            />
          </Grid>
        </Grid>
      </Grid>
    </InstantSearch>
  )
}

export default Shop
