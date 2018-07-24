import gql from 'graphql-tag';

export default gql`
  query EmployeesQuery {
    employees(orderBy: firstName_ASC) {
      id
      firstName
      lastName
      jobTitle
      phoneNumber
    }
  }
`;
