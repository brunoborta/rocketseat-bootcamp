import React from 'react';
import { View } from 'react-native';
// import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

// import { Container } from './styles';

export default function Repository({ navigation }) {
  const repository = navigation.getParam('repository');

  return <View />;
}

Repository.navigationOptions = ({ navigation }) => {
  const repo = navigation.getParam('repository');
  return {
    title: repo.name,
  };
};

Repository.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
