import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, NavigatorIOS, StatusBar } from 'react-native';
import QuizScreen from './components/QuizScreen.js'
import MenuScreen from './components/MenuScreen.js'

export default class App extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: MenuScreen,
          title: 'Menu',
        }}
        style={{flex: 1}}
        barTintColor='#c0c0c0'
      />
    );
  }
}
