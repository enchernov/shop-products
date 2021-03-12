import { gql } from '@apollo/client'

const DELETE_ADDRESS = gql`
  mutation createOrder($input: deleteAddressInput!) {
    deleteAddress(input: $input) {
      address {
        id
        address
      }
    }
  }
`

export default DELETE_ADDRESS
