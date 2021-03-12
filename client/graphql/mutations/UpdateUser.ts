import { gql } from '@apollo/client'

const UPDATE_USER = gql`
  mutation updateUser($input: updateUserInput) {
    updateUser(input: $input) {
      user {
        id
        username
        email
        confirmed
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
  }
`

export default UPDATE_USER
