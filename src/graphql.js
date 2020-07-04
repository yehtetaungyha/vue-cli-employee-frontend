import gql from "graphql-tag";
export const ALL_EMPLOYEE_QUERY = gql`query AllEmployeeQuery {
        employees {
          id
          employee_name
          employee_email
          employee_phone
          employee_address
        }
    }`
export const SIGNUP_MUTATION = gql`mutation SignupMutation($name: String!, $email: String!, $password: String!) {
        register(
            name: $name,
            email: $email,
            password: $password
        ) {
            id
            name
            email
        }
    }`
export const LOGIN_MUTATION = gql`mutation LoginMutation($data:LoginInput!) {
        login(
            data: $data,
        ){
            access_token
        }
    }`


export const CREATE_MUTATION = gql`mutation CreateMutation(
            $employee_name: String!
            $employee_email: String!
            $employee_phone: String!
            $employee_address: String!) {
        createEmployee(
            employee_name:$employee_name,
            employee_email: $employee_email,
            employee_phone: $employee_phone,
            employee_address:$employee_address
        ){
              id
              employee_name
              employee_email
              employee_phone
              employee_address
            }
    }`

export const UPDATE_MUTATION = gql`mutation UPDATEMutation(
            $id: ID!
            $employee_name: String!
            $employee_email: String!
            $employee_phone: String!
            $employee_address: String!) {
        updateEmployee(
            id: $id
            employee_name:$employee_name,
            employee_email: $employee_email,
            employee_phone: $employee_phone,
            employee_address:$employee_address
        ){
              id
              employee_name
              employee_email
              employee_phone
              employee_address
            }
    }`

export const DELETE_MUTATION = gql`mutation DeleteMutation($id: ID!) {
        deleteEmployee(id:$id ){
              id
              employee_name
              employee_email
              employee_phone
              employee_address
            }
    }`