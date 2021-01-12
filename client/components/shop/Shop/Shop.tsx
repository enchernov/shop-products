import React, { FunctionComponent, useContext } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { CategoryOutlined } from '@material-ui/icons'

import { Input, Link, Divider } from '@ui/index'

import { ICategoryProps, IProductProps } from '@interfaces/shop'

import { ShopContext } from '@providers/ShopProvider'

import ProductCard from '@components/shop/ProductCard'
import SortingSelector from '@components/shop/SortingSelector'

import { useStyles } from './Shop.styles'

const Shop: FunctionComponent = () => {
  const classes = useStyles()
  const { state } = useContext(ShopContext)

  const handleChangeSearch = (e) => {
    console.log(e.currentTarget.value)
  }

  return (
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
                <SortingSelector />
              </Grid>
              <Grid item>
                <Typography variant={'body2'}>
                  Результатов:&nbsp;{state.products.length}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justify={'flex-start'} spacing={3}>
              {state.products.map((p: IProductProps, index: number) => (
                <Grid item key={index}>
                  <ProductCard {...p} />
                </Grid>
              ))}
            </Grid>
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
          <Grid item>
            <Input
              label={'Поиск товаров'}
              variant={'filled'}
              icon={'search'}
              id={'shop-search-input'}
              type={'text'}
              name={'shop-search-input'}
              onChange={handleChangeSearch}
              fullWidth={true}
            />
          </Grid>
          <Grid item>
            <Typography variant={'h3'}>Категории</Typography>
          </Grid>
          {state.categories.map((category: ICategoryProps, index: number) => (
            <Grid item key={index}>
              <Grid container spacing={1} alignItems={'center'}>
                <Grid item>
                  <CategoryOutlined className={classes.categoryIcon} />
                </Grid>
                <Grid item>
                  <Link
                    href={`/category/${category.link}`}
                    className={classes.categoryLink}
                  >
                    {category.name}
                  </Link>
                </Grid>
              </Grid>
              {index !== state.categories.length - 1 && (
                <Divider className={classes.categoryDivider} />
              )}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Shop
