import { gql } from '@apollo/client'

const UPLOAD = gql`
  mutation uploadFile(
    $file: Upload!
    $refId: ID
    $ref: String
    $field: String
    $source: String
  ) {
    upload(
      file: $file
      refId: $refId
      field: $field
      source: $source
      ref: $ref
    ) {
      url
      id
    }
  }
`

export default UPLOAD
