import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import Question from './Question.js';
import Options from './Options.js'
import { shuffle } from '../utils/Utils.js';

export default class QuizScreen extends React.Component {

  state = {
    quiz: [],
    counter: 0,
    url: 'https://opentdb.com/api.php?amount=20&category=27&difficulty=medium',
    urls: {
      sports: 'https://opentdb.com/api.php?amount=20&category=21&type=multiple',
      books: 'https://opentdb.com/api.php?amount=30&category=10&difficulty=medium&type=multiple',
      animals: 'https://opentdb.com/api.php?amount=15&category=27&difficulty=medium&type=multiple'
    },
    score: 0
  }

  componentDidMount() {
    console.log("Hello Hello " + this.props.url)

    this.setState((prevState) => {
      return {url: prevState.urls[this.props.url]}
    }, () => {
      fetch(this.state.url).then(response => {
        return response.json()
      }).then(response => {
        let _quiz = response.results
        // console.log(_quiz)
        _quiz = shuffle(_quiz)
        this.setState({
          quiz: _quiz
        })
      }).catch(err => {
        console.log(err)
      })
    })
  }

  checkAnswer = (event, answer, correct_answer) => {
    if (answer === correct_answer) {
        Alert.alert(correct_answer)
        this.incremenetScore()
    }
    this.incremenetCounter()
  }

  incremenetCounter = () => {
    this.setState(prevState => {
      let _counter = prevState.counter < this.state.quiz.length - 1 ? prevState.counter + 1 : prevState.counter
      return {counter: _counter}
    })

  }

  incremenetScore = () => {
    this.setState(prevState =>{
      let _score = prevState.score + 1
      return {score: _score}
    })
  }

  render() {
    return (
      <View style={styles.QuizScreen}>
        {
          this.state.quiz.length === 0 ? 
            (
              <View>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )
            :
            (
              <View>
                <Text style={{justifyContent: 'center'}}> 
                  {this.state.counter + 1 + " / " + this.state.quiz.length}
                </Text>
                <Text style={{justifyContent: 'center'}}> 
                  {"Score " + this.state.score}
                </Text>
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
  QuizScreen: {
    marginTop: 225,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});