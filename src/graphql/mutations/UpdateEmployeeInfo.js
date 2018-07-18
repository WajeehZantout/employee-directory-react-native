import gql from 'graphql-tag';

export default gql`
  mutation UpdateEmployeeInfoMutation(
    $id: String!
    $firstName: String!
    $lastName: String!
    $jobTitle: String!
    $phoneNumber: String!
  ) {
    updateEmployeeInfo(
      id: $id
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
