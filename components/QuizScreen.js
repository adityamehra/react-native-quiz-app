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
    category: 'books',
    score: 0
  }

  componentDidMount() {
    const { navigation } = this.props;
    let category = navigation.getParam('url', 'sports')

    this.setState((prevState) => {
      const _url = prevState.urls[category] === undefined ? prevState.urls['books']:prevState.urls[category]
      return {url: _url, category}
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
      let _score = prevState.counter < this.state.quiz.length - 1 ? prevState.score + 1 : prevState.score
      return {score: _score}
    })
  }

  render() {
    return (
      <View style = {styles.QuizContainer1}>
        {
          this.state.quiz.length === 0 ? 
            (
              <View style={{flex: 1, flexDirection:'row', justifyContent:'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#FFFDE7" />
              </View>
            )
            :
            (
              <View style = {styles.QuizContainer2}>
                <View style={styles.InfoCardContainer}>
                  <Text style = {styles.ScoreBox}>
                    {"Score " + this.state.score}
                  </Text>
                </View>
                <View style={styles.QuizCardContainer3}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={styles.InfoCardContainer2}>
                      <View style={{flex: 1}}>
                        <Text style = {styles.CategoryBox}>
                          {this.state.category}
                        </Text>
                      </View>
                      <View style={{flex: 1}}>
                      </View>
                      <View style={{flex: 1}}>
                        <Text style = {styles.CategoryBox}>
                          {this.state.counter + 1 + " / " + this.state.quiz.length}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.QuizCard}>
                      <Question
                        question = {this.state.quiz[this.state.counter].question}
                      />
                      <Options
                        checkAnswer = {this.checkAnswer}
                        correct = {this.state.quiz[this.state.counter].correct_answer} 
                        incorrect = {this.state.quiz[this.state.counter].incorrect_answers} 
                      />
                    </View>
                  </View>
                </View>
                <View style={{flex: 0.5}}>
                </View>
              </View>
            )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  QuizContainer1: {
    flex: 1,
    backgroundColor: '#FBC02D',
    // borderWidth: 1,
    // borderRadius: 5,
    // borderColor: '#000',
  },
  QuizContainer2: {
    marginTop: 0,
    paddingTop: 0,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#FBC02D',
    alignItems: 'center',
    // borderWidth: 1,
    // borderRadius: 5,
    // borderColor: '#000',
  },
  QuizCardContainer3: {
    // borderWidth: 1,
    borderRadius: 10,
    // borderColor: '#000',
    flex: 5,
    margin: 10,
    backgroundColor: '#FFFDE7',
    flexDirection: 'row',
    color: '#444444'
  },
  QuizCard: {
    flex: 8,
    padding: 5,
  },
  InfoCardContainer2: {
    // borderWidth: 1,
    // borderRadius: 2,
    // borderColor: "#000",
    flex: 1,
    flexDirection: 'row',
  },
  InfoCardContainer: {
    // borderWidth: 1,
    // borderRadius: 2,
    // borderColor: "#000",
    // elevation: 1,
    flex: 1,
    flexDirection: 'row',
    width: 200,
    margin: 10
  },
  Box: {
    textAlign:'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
    padding: 5,
    margin: 10,
    flex: 1
  },
  ScoreBox: {
    textAlign:'center',
    // borderWidth: 1,
    // borderRadius: 5,
    // borderColor: '#000',
    color: '#FFFDE7',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
    margin: 10,
    flex: 1
  },
  CategoryBox: {
    textAlign:'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 18,
    borderColor: '#FBC02D',
    padding: 2,
    margin: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});