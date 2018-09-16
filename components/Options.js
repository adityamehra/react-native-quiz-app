import React from 'react';
import { View, FlatList, Button, ActivityIndicator } from 'react-native';
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
            <View >
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
                            <View>
                                <Button
                                    onPress={(event) => { this.props.checkAnswer(event, item.key, this.state.correct) }}
                                    title={item.key}
                                    color="#C0C0C0"
                                />
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
