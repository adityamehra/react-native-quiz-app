import React from 'react'
import { View, FlatList, Button, StyleSheet } from 'react-native'
import QuizScreen from './QuizScreen.js'

export default class MenuScreen extends React.Component {

    state = {
        topics: [{key:'books'}, {key:'sports'}, {key:'animals'}]
    }

    _handleNextPress(url) {
        this.nextRoute.passProps.url = url
        this.props.navigator.push(this.nextRoute);
    }

    nextRoute = {
        component: QuizScreen,
        title: 'Quiz',
        passProps: { url: 'sports' }
    };

    render() {
        return (
            <View style={styles.MenuScreen}>
                <FlatList
                    data={this.state.topics}
                    renderItem={({item}) => <Button
                        onPress={() => {this._handleNextPress(item.key)}}
                        title={item.key}
                        color="#C0C0C0"
                        accessibilityLabel="Learn more about this purple button"
                    />}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MenuScreen: {
      marginTop: 225,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  