import { gql } from '@apollo/client'

const RESET_PASSWORD = gql`
  mutation ResetPassword(
    $password: String!
    $passwordConfirmation: String!
    $code: String!
  ) {
    resetPassword(
      password: $password
      passwordConfirmation: $passwordConfirmation
      code: $code
    ) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`

export default RESET_PASSWORD
