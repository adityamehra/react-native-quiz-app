import React from 'react'
import { View, FlatList, Button, StyleSheet, TouchableOpacity, Text } from 'react-native'
import QuizScreen from './QuizScreen.js'

export default class MenuScreen extends React.Component {

    state = {
        topics: [
            {key:'books'},
            {key:'sports'},
            {key:'animals'},
            {key:'history'},
            {key:'television'},
            {key:'geography'}
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
            <View style={styles.MenuScreen}>
                {this.state.topics.map(item => {
                    return (
                        <View style={styles.CategoryContainer}>
                            <TouchableOpacity 
                                style={styles.Category} 
                                onPress={() => {this._handleNextPress(item.key)}}>
                                    <View style={{alignItems: 'center'}}>
                                        <Text>{item.key}</Text>
                                    </View>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MenuScreen: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#1B5C60',
        // borderWidth: 1,
        // borderColor: 'red',
        padding: 10
    },
    CategoryContainer: {
        width: '50%',
        height: '25%',
        // borderWidth: 1,
        // borderColor: '#000',
        justifyContent: 'center',
        alignItems:'center'
    },
    Category: {
        height: 125,
        width: 125,
        margin: 2,
        justifyContent: 'center',
        borderRadius: 62.5,
        // borderWidth: 2,
        // borderColor: '#FBC02D',
        backgroundColor: '#E5736B'
    }                                    
  });
  