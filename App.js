import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, NavigatorIOS, StatusBar } from 'react-native';
import QuizScreen from './components/QuizScreen.js'
import MenuScreen from './components/MenuScreen.js'
import { createStackNavigator } from 'react-navigation'

const Navigation = createStackNavigator(
  {
    Menu: { screen: MenuScreen },
    Quiz: { screen: QuizScreen },
  },
  {
    initialRouteName: 'Menu'
  });

export default class App extends React.Component {
  render() {
    return (
      <Navigation style={styles.MenuScreen}/>
    );
  }
}

const styles = StyleSheet.create({
  MenuScreen: {
    marginTop: 100,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
