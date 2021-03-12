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
      addresses {
        id
        address
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
    }
  }
`

export default ME
