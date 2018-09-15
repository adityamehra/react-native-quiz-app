import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import Question from './Question.js';
import Options from './Options.js'
import { shuffle } from '../utils/Utils.js';

export default class QuizScreen extends React.Component {

  state = {
    quiz: [],
    counter: 0
  }

  componentDidMount() {
    fetch('https://opentdb.com/api.php?amount=30&category=10&difficulty=medium').then(response => {
      return response.json()
    }).then(response => {
      let _quiz = response.results
      _quiz = shuffle(_quiz)
      this.setState({
        quiz: _quiz
      })
    }).catch(err => {
      console.log(err)
    })
  }

  checkAnswer = (event, answer, correct_answer) => {
    if (answer === correct_answer) {
        Alert.alert(correct_answer)
        this.incremenetCounter()
    }
  }

  incremenetCounter = () => {
    this.setState(prevState => {
      let _counter = prevState.counter < this.state.quiz.length ? prevState.counter + 1 : prevState.counter
      return {counter: _counter}
    })

  }

  render() {
    return (
      <View>
        {this.state.quiz.length === 0 ? 
          (
            <View>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )
          :
          (
            <View>
              <Question question={this.state.quiz[this.state.counter].question}/>
              <Options 
                checkAnswer = {this.checkAnswer}
                correct={this.state.quiz[this.state.counter].correct_answer} 
                incorrect={this.state.quiz[this.state.counter].incorrect_answers} 
              />
            </View>
          )
      }
        
        
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