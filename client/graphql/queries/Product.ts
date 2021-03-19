import { gql } from '@apollo/client'

const PRODUCT = gql`
  query product($id: ID!) {
    product(id: $id) {
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

export default PRODUCT
