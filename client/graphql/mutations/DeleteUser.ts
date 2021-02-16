import { gql } from '@apollo/client'

const DELETE_USER = gql`
  mutation deleteUser($input: deleteUserInput) {
    deleteUser(input: $input) {
      user {
        id
        username
        email
        avatar {
          url
          id
        }
      }
    }
  }
`

export default DELETE_USER
