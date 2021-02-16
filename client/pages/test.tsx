import React from 'react'
import { NextPage } from 'next'

import Layout from '@components/layouts/Layout'
// import { findResultsState } from 'react-instantsearch-dom/server'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom'
import ProductCard from '@components/shop/components/ProductCard'
const indexName = 'dev_PRODUCTS'

// Keys are supplied from Algolio's instant search example
// https://github.com/algolia/react-instantsearch
const searchClient = algoliasearch(
  'AQACOGUA51',
  'b02a6b02a41eb2da855e9e6723e4691c'
)

const TestPage: NextPage = () => {
  return (
    <Layout title="Algolia">
      <InstantSearch indexName={indexName} searchClient={searchClient}>
        <SearchBox />
        <Hits hitComponent={(hit) => <ProductCard {...hit} />} />
      </InstantSearch>
    </Layout>
  )
}

export default TestPage

// current refined list chips close
