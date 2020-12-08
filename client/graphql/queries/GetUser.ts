import { gql } from '@apollo/client'

const GET_USER = gql`
  query {
    me {
      id
      username
      email
      confirmed
    }
  }
`

export default GET_USER
