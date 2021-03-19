import { gql } from '@apollo/client'

const PRODUCTS = gql`
  query {
    products {
      id
      name
      price
      rating
      published_at
      available
      image {
        url
        formats
      }
      categories {
        name
        link
      }
      description
    }
  }
`

export default PRODUCTS
