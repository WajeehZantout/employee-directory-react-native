import gql from 'graphql-tag';

export default gql`
  mutation AddEmployeeMutation(
    $firstName: String!
    $lastName: String!
    $jobTitle: String!
    $phoneNumber: String!
  ) {
    addEmployee(
      firstName: $firstName
      lastName: $lastName
      jobTitle: $jobTitle
      phoneNumber: $phoneNumber
    ) {
      id
      firstName
      lastName
      jobTitle
      phoneNumber
    }
  }
`;
