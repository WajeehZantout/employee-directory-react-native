import gql from 'graphql-tag';

export default gql`
  mutation RemoveEmployeeMutation($id: String!) {
    removeEmployee(id: $id) {
      id
      firstName
      lastName
      jobTitle
      phoneNumber
    }
  }
`;
