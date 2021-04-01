import { gql } from '@apollo/client'

const CREATE_TICKET = gql`
  mutation createTicket($input: createTicketInput!) {
    createTicket(input: $input) {
      ticket {
        id
        user {
          id
          email
          username
        }
        email
        message
        name
      }
    }
  }
`

export default CREATE_TICKET
