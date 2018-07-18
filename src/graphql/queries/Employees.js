import gql from 'graphql-tag';

export default gql`
  query EmployeesQuery {
    employees {
      id
      firstName
      lastName
      jobTitle
      phoneNumber
    }
  }
`;
