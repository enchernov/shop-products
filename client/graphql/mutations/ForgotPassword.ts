import { gql } from '@apollo/client'

const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email) {
      ok
    }
  }
`
export default FORGOT_PASSWORD
