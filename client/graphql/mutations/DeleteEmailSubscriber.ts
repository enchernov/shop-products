import { gql } from '@apollo/client'

const DELETE_EMAIL_SUBSCRIBER = gql`
  mutation deleteEmailSubscriber($input: deleteEmailSubscriberInput!) {
    deleteEmailSubscriber(input: $input) {
      emailSubscriber {
        id
        user {
          id
          email
          username
        }
        email
      }
    }
  }
`

export default DELETE_EMAIL_SUBSCRIBER
