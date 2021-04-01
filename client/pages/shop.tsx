import React from 'react'
import { NextPage } from 'next'

import Layout from '@components/layouts/Layout'
import Shop from '@components/shop/Shop'

const ShopPage: NextPage = () => {
  // console.log(state)
  // const {
  //   data: categoriesData,
  //   error: categoriesError,
  //   loading: categoriesLoading,
  // } = useQuery(CATEGORIES)
  // const {
  //   data: productsData,
  //   error: productsError,
  //   loading: productsLoading,
  // } = useQuery(PRODUCTS)
  //
  // useEffect(() => {
  //   if (
  //     !categoriesLoading &&
  //     !categoriesError &&
  //     categoriesData?.categories &&
  //     state.categories !== categoriesData.categories
  //   ) {
  //     dispatch(ACTIONS.setCategories(categoriesData.categories))
  //   }
  //   if (
  //     !productsLoading &&
  //     !productsError &&
  //     productsData?.products &&
  //     state.products !== productsData.products
  //   ) {
  //     dispatch(ACTIONS.setProducts(productsData.products))
  //   }
  // }, [productsData, categoriesData])

  return (
    <Layout title="Магазин | FoodMarket">
      <Shop />
    </Layout>
  )
}

export default ShopPage
