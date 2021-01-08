import { gql } from '@apollo/client'

const UPDATE_USER = gql`
  mutation updateUser($input: updateUserInput) {
    updateUser(input: $input) {
      user {
        id
        username
        email
        avatar {
          url
        }
      }
    }
  }
`

export default UPDATE_USER
