import React, { useContext, useEffect } from 'react'
import { NextPage } from 'next'
import { useQuery } from '@apollo/client'

import Layout from '@components/layouts/Layout'
import Shop from '@components/shop/Shop'
import withAuth from '@hocs/withAuth'
import CATEGORIES from '@graphql/queries/Categories'
import PRODUCTS from '@graphql/queries/Products'
import * as ACTIONS from '@actions/shop'
import { ShopContext } from '@providers/ShopProvider'

import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async (context) => {
  return {}
}
const ShopPage: NextPage = () => {
  const { state, dispatch } = useContext(ShopContext)
  console.log(state)
  const {
    data: categoriesData,
    error: categoriesError,
    loading: categoriesLoading,
  } = useQuery(CATEGORIES)
  const {
    data: productsData,
    error: productsError,
    loading: productsLoading,
  } = useQuery(PRODUCTS)

  useEffect(() => {
    if (
      !categoriesLoading &&
      !categoriesError &&
      categoriesData?.categories &&
      state.categories !== categoriesData.categories
    ) {
      dispatch(ACTIONS.setCategories(categoriesData.categories))
    }
    if (
      !productsLoading &&
      !productsError &&
      productsData?.products &&
      state.products !== productsData.products
    ) {
      dispatch(ACTIONS.setProducts(productsData.products))
    }
  }, [productsData, categoriesData])
  return (
    <Layout title="Магазин">
      <Shop />
    </Layout>
  )
}

export default withAuth(ShopPage)
