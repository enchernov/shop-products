import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Product from '@components/product/Product'
import Layout from '@components/layouts/Layout'
import { useQuery } from '@apollo/client'
import PRODUCT from '@graphql/queries/Product'

const ProductPage: NextPage = () => {
  const router = useRouter()
  // console.log(router)
  const productId = router.query.id
  const { data, loading } = useQuery(PRODUCT, {
    variables: {
      id: productId,
    },
  })

  useEffect(() => {
    if (!data?.product && !loading) {
      router.push('/shop')
    }
  }, [router.query, loading, data])

  return (
    <Layout
      title={
        data?.product?.name
          ? `${data?.product?.name} | FoodMarket`
          : 'FoodMarket'
      }
    >
      <Product product={data?.product} />
    </Layout>
  )
}

export default ProductPage
