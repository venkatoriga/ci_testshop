
import { gql } from '@apollo/client';


export const AccountRegister = gql`
mutation AccountRegister($email: String!, $password: String!) {
    accountRegister(
      input: {
        email: $email
        password: $password
      }
    ) {
      errors {
        field
        code
      }
      user {
        id
        email
        isActive
      }
    }
  }
`;




  