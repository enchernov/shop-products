import { gql } from '@apollo/client'

const USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      username
      email
      avatar {
        url
        id
      }
    }
  }
`

export default USER
