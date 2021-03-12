import { gql } from '@apollo/client'

const PRODUCT = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      price
      rating
      published_at
      available
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

export default PRODUCT
