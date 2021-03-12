import { gql } from '@apollo/client'

const CREATE_ORDER = gql`
  mutation createOrder($input: createOrderInput!) {
    createOrder(input: $input) {
      order {
        id
        total
        products
        address
      }
    }
  }
`

export default CREATE_ORDER
