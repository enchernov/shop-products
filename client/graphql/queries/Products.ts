import { gql } from '@apollo/client'

const PRODUCTS = gql`
  query {
    products {
      id
      name
      price
      rating
      image {
        url
      }
      categories {
        name
        link
      }
    }
  }
`

export default PRODUCTS
