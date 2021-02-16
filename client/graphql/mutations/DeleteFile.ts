import { gql } from '@apollo/client'

const DELETE_FILE = gql`
  mutation deleteFile($input: deleteFileInput) {
    deleteFile(input: $input) {
      file {
        id
        url
      }
    }
  }
`

export default DELETE_FILE
