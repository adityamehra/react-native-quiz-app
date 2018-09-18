import React from 'react'
import { View, FlatList, Button, StyleSheet, TouchableOpacity, Text } from 'react-native'
import QuizScreen from './QuizScreen.js'

export default class MenuScreen extends React.Component {

    state = {
        topics: [
            {key:'books'},
            {key:'sports'},
            {key:'animals'},
            {key:'<TBD 1>'},
            {key:'<TBD 2>'},
            {key:'<TBD 3>'}
        ]
    }

    _handleNextPress(category) {
        this.nextRoute.passProps.url = category
        this.props.navigation.navigate('Quiz', {
            url: category
        })
    }

    nextRoute = {
        component: QuizScreen,
        title: 'Quiz',
        passProps: { url: 'sports' }
    };

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
                <FlatList
                        data={this.state.topics}
                        renderItem={({item}) => (
                            <View>
                                <TouchableOpacity 
                                    style={styles.Category} 
                                    onPress={() => {this._handleNextPress(item.key)}}>
                                        <View style={{alignItems: 'center'}}>
                                            <Text>{item.key}</Text>
                                        </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MenuScreen: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    MenuScreen2: {
        marginTop: 150,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    Category: {
        height: 100,
        margin: 2,
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000'
    }                                    
  });
  