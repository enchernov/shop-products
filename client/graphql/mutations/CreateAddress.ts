import { gql } from '@apollo/client'

const CREATE_ADDRESS = gql`
  mutation createOrder($input: createAddressInput!) {
    createAddress(input: $input) {
      address {
        id
        address
      }
    }
  }
`

export default CREATE_ADDRESS
