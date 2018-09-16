import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';

export default class Question extends React.Component {
  render() {
    return (
      <View>
        <Text>
            {this.props.question}
        </Text>
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