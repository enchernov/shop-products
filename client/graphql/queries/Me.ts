import { gql } from '@apollo/client'

const ME = gql`
  query {
    me {
      id
      username
      email
      confirmed
      avatar {
        url
        id
      }
      #      cart {
      #        products {
      #          name
      #          id
      #          price
      #          count
      #        }
      #      }
    }
  }
`

export default ME
