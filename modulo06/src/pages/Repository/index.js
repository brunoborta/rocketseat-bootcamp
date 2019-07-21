import React from 'react';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

export default function Repository({ navigation }) {
  const repository = navigation.getParam('repository');
  return (
    <WebView
      startInLoadingState
      renderLoading={() => (
        <ActivityIndicator
          color="#7159c1"
          size="large"
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        />
      )}
      source={{ uri: repository.html_url }}
      style={{ flex: 1 }}
    />
  );
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
