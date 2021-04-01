import { gql } from '@apollo/client'

const CREATE_EMAIL_SUBSCRIBER = gql`
  mutation createEmailSubscriber($input: createEmailSubscriberInput!) {
    createEmailSubscriber(input: $input) {
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

export default CREATE_EMAIL_SUBSCRIBER
