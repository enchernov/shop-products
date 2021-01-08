import React, { FunctionComponent, useContext } from 'react'
import { Grid, Typography } from '@material-ui/core'
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined'

import { Input, Link, Divider } from '@ui/index'
import { IProductProps } from '@interfaces/shop'
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
                  {state.products.length} результатов
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justify={'space-around'} spacing={1}>
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
          {state.categories.map((x, index) => (
            <Grid item key={index}>
              <Grid container spacing={1} alignItems={'center'}>
                <Grid item>
                  <FolderOutlinedIcon className={classes.categoryIcon} />
                </Grid>
                <Grid item>
                  <Link href={x.link} className={classes.categoryLink}>
                    {x.name}
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
