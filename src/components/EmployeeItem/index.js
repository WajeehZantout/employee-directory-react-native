// @flow

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

type Props = {
  employee: Object,
  onRemove: Function,
  onPress: Function,
};

const EmployeeItem = ({
  employee: { firstName, lastName, jobTitle },
  onRemove,
  onPress,
}: Props) => {
  const swipeOutButton = [
    {
      component: (
        <View style={styles.removeButton}>
          <Icon name="trash" size={25} color="white" />
        </View>
      ),
      onPress: () => onRemove(),
    },
  ];

  return (
    <Swipeout
      right={swipeOutButton}
      sensitivity={2}
      autoClose
      backgroundColor="transparent"
      style={styles.swipeOutContainer}
    >
      <TouchableOpacity onPress={() => onPress()}>
        <ListItem
          title={`${firstName} ${lastName}`}
          leftIcon={{
            name: 'user-circle',
            type: 'font-awesome',
            size: 35,
            color: 'black',
            style: styles.userIcon,
          }}
          subtitle={jobTitle}
        />
      </TouchableOpacity>
    </Swipeout>
  );
};

export default EmployeeItem;
