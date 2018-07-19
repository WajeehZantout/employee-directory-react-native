// @flow

import React, { Component } from 'react';
import {
  View, Text, FlatList, RefreshControl,
} from 'react-native';
import { withApollo } from 'react-apollo';

import EmployeesQuery from '../../graphql/queries/Employees';
import styles from './styles';
import { CHECK_INTERNET_CONNECTION, NO_EMPLOYEES } from '../../constants';

type Props = {
  client: Object,
};

type State = {
  loading: boolean,
  employees: Array<Object>,
};

class EmployeesList extends Component<Props, State> {
  static navigationOptions = () => ({
    title: 'List of Employees',
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
        })
        .then((res) => {
          this.setState({ loading: false });
          if (res) {
            if (res.data.employees) {
              this.setState({ employees: res.data.employees });
            }
          } else {
            /* eslint no-alert: 0 */
            alert(CHECK_INTERNET_CONNECTION);
          }
        });
    });
  }

  static renderRow(row) {
    const { item, index } = row;
    return (
      <View>
        <Text>
          {`${index + 1}. ${item.firstName} ${item.lastName}`}
        </Text>
      </View>
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
        renderItem={row => EmployeesList.renderRow(row)}
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
