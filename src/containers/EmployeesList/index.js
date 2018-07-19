// @flow

import React, { Component } from 'react';
import {
  View, Text, FlatList, RefreshControl, Alert,
} from 'react-native';
import { withApollo } from 'react-apollo';

import EmployeeDetails from '../../components/EmployeeDetails';
import AddButton from '../../components/AddButton';
import EmployeesQuery from '../../graphql/queries/Employees';
import RemoveEmployeeMutation from '../../graphql/mutations/RemoveEmployee';
import styles from './styles';
import {
  CHECK_INTERNET_CONNECTION,
  NO_EMPLOYEES,
  EMPLOYEE_REMOVAL_CONFIRMATION,
} from '../../constants';

type Props = {
  client: Object,
  navigation: Object,
};

type State = {
  loading: boolean,
  employees: Array<Object>,
};

class EmployeesList extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    title: 'List of Employees',
    headerRight: <AddButton navigation={navigation} />,
  });

  state = {
    loading: false,
    employees: [],
  };

  componentDidMount() {
    this.getEmployees();
  }

  getEmployees() {
    const { client } = this.props;
    this.setState({ loading: true }, () => {
      client
        .query({
          query: EmployeesQuery,
          fetchPolicy: 'network-only',
        })
        .then((res) => {
          this.setState({ loading: false });
          if (res) {
            if (res.data.employees) {
              this.setState({ employees: res.data.employees });
            }
          }
        })
        .catch(() => {
          this.setState({ loading: false });
          /* eslint no-alert: 0 */
          alert(CHECK_INTERNET_CONNECTION);
        });
    });
  }

  removeEmployee(id) {
    const { client } = this.props;
    Alert.alert('Alert', EMPLOYEE_REMOVAL_CONFIRMATION, [
      { text: 'NO', onPress: () => {}, style: 'cancel' },
      {
        text: 'Yes',
        onPress: () => {
          this.setState({ loading: true }, () => {
            client
              .mutate({
                mutation: RemoveEmployeeMutation,
                variables: { id },
              })
              .then((res) => {
                this.setState({ loading: false });
                if (res) {
                  if (res.data.removeEmployee) {
                    this.getEmployees();
                  }
                }
              })
              .catch(() => {
                this.setState({ loading: false });
                /* eslint no-alert: 0 */
                alert(CHECK_INTERNET_CONNECTION);
              });
          });
        },
      },
    ]);
  }

  goToEmployeeForm(employee) {
    const { navigation } = this.props;
    navigation.navigate('employeeForm', {
      title: 'Edit Employee',
      employee,
    });
  }

  renderRow(row) {
    const { item } = row;
    return (
      <EmployeeDetails
        employee={item}
        onRemove={() => this.removeEmployee(item.id)}
        onPress={() => this.goToEmployeeForm(item)}
      />
    );
  }

  renderNoData() {
    const { loading } = this.state;
    if (loading) {
      return null;
    }
    return (
      <Text style={styles.noEmployeesText}>
        {NO_EMPLOYEES}
      </Text>
    );
  }

  renderList() {
    const { employees, loading } = this.state;
    return (
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => this.getEmployees()} />
        }
        ListEmptyComponent={() => this.renderNoData()}
        data={employees}
        renderItem={row => this.renderRow(row)}
        keyExtractor={item => item.id}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderList()}
      </View>
    );
  }
}

export default withApollo(EmployeesList);
