import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, NavigatorIOS } from 'react-native';
import QuizScreen from './compnents/QuizScreen.js'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <QuizScreen />
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
