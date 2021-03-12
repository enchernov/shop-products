import { gql } from '@apollo/client'

const CATEGORIES = gql`
  query {
    categories {
      id
      name
      link
    }
  }
`

export default CATEGORIES
