// @flow

import * as React from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';

type Props = {
  label: string,
  type: string,
  onChangeText: Function,
  value: string,
  children: React.Node,
};

const FormField = ({
  label, type, onChangeText, value, children,
}: Props) => (
  <View>
    <FormLabel>
      {label}
    </FormLabel>
    <FormInput keyboardType={type} onChangeText={onChangeText} value={value} />
    {children}
  </View>
);

export default FormField;
