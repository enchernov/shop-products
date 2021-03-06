import React, { FunctionComponent, useState } from 'react'
import { Grid, Typography, useMediaQuery, useTheme } from '@material-ui/core'

import SortingSelector from '@components/shop/components/SortingSelector'

import { useStyles } from './Shop.styles'

import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-dom'
import ProductHits from '@components/shop/components/ProductHits'
import ProductSearchBox from '@components/shop/components/ProductSearchBox'
import Menu from '@components/shop/components/Menu'
import PriceRange from '@components/shop/components/PriceRange'
import CartMini from '@components/shop/components/CartMini'

const indexName = 'dev_PRODUCTS'

const searchClient = algoliasearch(
  'AQACOGUA51',
  'b02a6b02a41eb2da855e9e6723e4691c'
)

const SideBar: FunctionComponent = () => {
  const classes = useStyles()
  return (
    <Grid container className={classes.side} direction={'column'} spacing={3}>
      <Grid item>
        <Menu attribute={'categories.name'} />
      </Grid>
      <Grid item>
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
      <Grid item>
        <CartMini />
      </Grid>
    </Grid>
  )
}

const Shop: FunctionComponent = () => {
  const [count, setCount] = useState<number>(0)
  const getCount = (v: number) => setCount(v)

  const theme = useTheme()
  const isSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <InstantSearch indexName={indexName} searchClient={searchClient}>
      <Grid
        container
        alignItems={'flex-start'}
        justify={'space-between'}
        spacing={3}
      >
        <Grid item xs={12} lg={9}>
          <Grid container direction={'column'} spacing={4}>
            <Grid item>
              <Grid
                container
                alignItems={'center'}
                justify={isSmallWidth ? 'center' : 'space-between'}
                direction={isSmallWidth ? 'column' : 'row'}
                spacing={isSmallWidth ? 2 : 0}
              >
                <Grid item>
                  <SortingSelector
                    defaultRefinement="products_publishing_date"
                    items={[
                      { value: 'products_publishing_date', label: 'Новинки' },
                      {
                        value: 'products_price_asc',
                        label: `Дешевле`,
                      },
                      {
                        value: 'products_price_desc',
                        label: 'Дороже',
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
        <Grid item xs={12} lg={3}>
          <SideBar />
        </Grid>
      </Grid>
    </InstantSearch>
  )
}

export default Shop
