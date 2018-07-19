// @flow

import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

type Props = {
  navigation: Object,
};

const AddButton = ({ navigation }: Props) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => navigation.navigate('employeeForm', {
      title: 'Add Employee',
      employee: {},
    })
    }
  >
    <Icon name="user-plus" color="black" size={25} />
  </TouchableOpacity>
);

export default AddButton;
