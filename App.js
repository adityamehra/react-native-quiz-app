import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, NavigatorIOS, StatusBar } from 'react-native';
import QuizScreen from './components/QuizScreen.js'
import MenuScreen from './components/MenuScreen.js'
import { createStackNavigator } from 'react-navigation'

const Navigation = createStackNavigator(
  {
    Menu: { 
      screen: MenuScreen,
      navigationOptions: () => ({
        title: `Select a category`
      }), 
    },
    Quiz: { screen: QuizScreen },
  },
  {
    initialRouteName: 'Menu'
  });

export default class App extends React.Component {
  render() {
    return (
      <Navigation />
    );
  }
}
