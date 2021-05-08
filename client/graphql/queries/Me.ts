import { gql } from '@apollo/client'

const ME = gql`
  query {
    me {
      id
      username
      email
      confirmed
    }
    self {
      email_subscriber {
        id
        email
      }
      avatar {
        url
        id
      }
      orders {
        id
        total
        products
        createdAt
        address
      }
      wishlist
      addresses
    }
  }
`

export default ME
