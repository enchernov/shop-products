import { gql } from "@apollo/client"

const LOGIN_USER = gql`
   mutation LoginUser($input: UsersPermissionsLoginInput!) {
       login(input: $input) {
           user {
               id
               username
               email
           }
       }     
   }
`

export default LOGIN_USER
