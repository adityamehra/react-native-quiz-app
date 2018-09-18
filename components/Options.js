import React from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { shuffle } from '../utils/Utils.js';

export default class Options extends React.Component {

    state = {
        correct: 'Loading 0...',
        incorrect: ['Loading 1 ...', 'Loading 2...', 'Loading 3...'],
        options: []
    }

    componentDidMount() {
        this.stateManagement()
    }

    componentDidUpdate(prevProps){
        if (prevProps.correct !== this.props.correct) {
            this.stateManagement()
        }
    }

    stateManagement = () => {
        _options = [
            {key: this.props.correct},
            {key: this.props.incorrect[0]},
            {key: this.props.incorrect[1]},
            {key: this.props.incorrect[2]}
        ]
        _options = shuffle(_options)
        this.setState({
            correct: this.props.correct,
            options:[..._options]
        })
    }

    render() {
        return (
            <View style={styles.container}>
            {
            this.state.options.length === 0 ? 
                (
                <View>
                    <ActivityIndicator size="large" color="#ff00ff" />
                </View>
                )
                :
                (
                <View>
                    <FlatList
                        data={this.state.options}
                        renderItem={({item}) => (
                            <View style={styles.OptionButton}>
                                <TouchableOpacity 
                                    style={styles.Category} 
                                    onPress={(event) => { this.props.checkAnswer(event, item.key, this.state.correct) }}>
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 6,
    },
    OptionButton: {
        margin: 5
    },
    Category: {
        height: 40,
        margin: 2,
        justifyContent: 'center',
        borderRadius: 18,
        borderWidth: 2,
        borderColor: '#000'
    }  
})
