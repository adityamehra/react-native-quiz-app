import React from 'react';
import { View, FlatList, Button, TouchableOpacity, Alert } from 'react-native';
import { shuffle } from '../utils/Utils.js';

export default class Options extends React.Component {

    state = {
        correct: 'Loading 0...',
        incorrect: ['Loading 1 ...', 'Loading 2...', 'Loading 3...'],
        options: []
    }

    componentDidMount() {

        options = [
            {key: this.props.correct},
            {key: this.props.incorrect[0]},
            {key: this.props.incorrect[1]},
            {key: this.props.incorrect[2]}
        ]

        options = shuffle(options)

        this.setState({
            correct: this.props.correct,
            options:[...options]
        })

    }

    componentDidUpdate(prevProps){
        if (prevProps.correct !== this.props.correct) {
            let _options = [
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
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.options}
                    renderItem={({item}) => <Button
                        onPress={(event) => { this.props.checkAnswer(event, item.key, this.state.correct) }}
                        title={item.key}
                        backGround
                        color="#C0C0C0"
                        accessibilityLabel="Learn more about this purple button"
                    />}
                />
            </View>
        );
    }
}
