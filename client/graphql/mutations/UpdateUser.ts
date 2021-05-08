import { gql } from '@apollo/client'

const UPDATE_USER = gql`
  mutation updateUser($input: updateUserInput) {
    updateUser(input: $input) {
      user {
        id
        username
        email
        confirmed
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
  }
`

export default UPDATE_USER
