// @flow

import React, { Component } from 'react';
import { ScrollView, Keyboard } from 'react-native';
import { Button, FormValidationMessage } from 'react-native-elements';
import { withApollo } from 'react-apollo';

import FormField from '../../components/FormField';
import AddEmployeeMutation from '../../graphql/mutations/AddEmployee';
import UpdateEmployeeInfoMutation from '../../graphql/mutations/UpdateEmployeeInfo';
import styles from './styles';
import { REQUIRED_FIELD, CHECK_INTERNET_CONNECTION, SUCCESS } from '../../constants';

type Props = {
  navigation: Object,
  client: Object,
};

type State = {
  showValidationMessage: boolean,
  loading: boolean,
  firstName: string,
  lastName: string,
  jobTitle: string,
  phoneNumber: string,
};

/* eslint consistent-return: 0 */
/* eslint no-alert: 0 */
class EmployeeForm extends Component<Props, State> {
  static navigationOptions = ({ navigation }: Props) => ({
    title: navigation.state.params.title,
  });

  constructor(props: Props) {
    super(props);
    const {
      firstName, lastName, jobTitle, phoneNumber,
    } = props.navigation.state.params.employee;
    this.state = {
      firstName: firstName || '',
      lastName: lastName || '',
      jobTitle: jobTitle || '',
      phoneNumber: phoneNumber || '',
      showValidationMessage: false,
      loading: false,
    };
  }

  editEmployeeInfo() {
    const {
      firstName, lastName, jobTitle, phoneNumber,
    } = this.state;
    const { navigation, client } = this.props;
    const {
      goBack,
      state: {
        params: {
          refreshEmployeesList,
          employee: { id },
        },
      },
    } = navigation;

    if (!firstName || !lastName || !jobTitle || !phoneNumber) {
      return this.setState({ showValidationMessage: true });
    }

    this.setState({ loading: true }, () => {
      client
        .mutate({
          mutation: UpdateEmployeeInfoMutation,
          variables: {
            id,
            firstName,
            lastName,
            jobTitle,
            phoneNumber,
          },
        })
        .then((res) => {
          this.setState({ loading: false });
          if (res.data.updateEmployeeInfo) {
            Keyboard.dismiss();
            refreshEmployeesList();
            alert(SUCCESS);
            goBack();
          }
        })
        .catch(() => {
          this.setState({ loading: false });
          alert(CHECK_INTERNET_CONNECTION);
        });
    });
  }

  addEmployee() {
    const {
      firstName, lastName, jobTitle, phoneNumber,
    } = this.state;
    const { navigation, client } = this.props;
    const {
      goBack,
      state: {
        params: { refreshEmployeesList },
      },
    } = navigation;

    if (!firstName || !lastName || !jobTitle || !phoneNumber) {
      return this.setState({ showValidationMessage: true });
    }

    this.setState({ loading: true }, () => {
      client
        .mutate({
          mutation: AddEmployeeMutation,
          variables: {
            firstName,
            lastName,
            jobTitle,
            phoneNumber,
          },
        })
        .then((res) => {
          this.setState({ loading: false });
          if (res.data.addEmployee) {
            Keyboard.dismiss();
            refreshEmployeesList();
            alert(SUCCESS);
            goBack();
          }
        })
        .catch(() => {
          this.setState({ loading: false });
          alert(CHECK_INTERNET_CONNECTION);
        });
    });
  }

  renderField(label: string, name: string, value: string, type: string) {
    return (
      <FormField
        label={label}
        value={value}
        type={type}
        onChangeText={text => this.setState({ [name]: text })}
      >
        {this.renderValidationMessage(value)}
      </FormField>
    );
  }

  renderValidationMessage(fieldValue: string) {
    const { showValidationMessage } = this.state;
    if (showValidationMessage && !fieldValue) {
      return (
        <FormValidationMessage>
          {REQUIRED_FIELD}
        </FormValidationMessage>
      );
    }
    return null;
  }

  renderButton() {
    const { loading } = this.state;
    const { navigation } = this.props;
    const { id } = navigation.state.params.employee;

    return (
      <Button
        disabled={loading}
        loading={loading}
        buttonStyle={styles.button}
        title={id ? 'Save' : 'Add'}
        onPress={() => (id ? this.editEmployeeInfo() : this.addEmployee())}
      />
    );
  }

  render() {
    const {
      firstName, lastName, jobTitle, phoneNumber,
    } = this.state;
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        {this.renderField('First Name', 'firstName', firstName, 'default')}
        {this.renderField('Last Name', 'lastName', lastName, 'default')}
        {this.renderField('Job Title', 'jobTitle', jobTitle, 'default')}
        {this.renderField('Phone Number', 'phoneNumber', phoneNumber, 'phone-pad')}
        {this.renderButton()}
      </ScrollView>
    );
  }
}

export default withApollo(EmployeeForm);
