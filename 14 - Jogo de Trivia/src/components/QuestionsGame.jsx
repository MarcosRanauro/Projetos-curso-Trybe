import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shuffle from './Shuffle';
import { actionScore, actionAssertions } from '../redux/actions';
import Timer from './Timer';
import '../App.css';

class QuestionsGame extends Component {
  state = {
    correct: '',
    incorrect: [],
    shuffleAnswers: [],
    count: 0,
    resultApi: [],
    seconds: 30,
    disabled: false,
    correctClass: 'correct-answer',
    wrongClass: 'wrong-answer',
    level: '',
    nextBtn: true,
  };

  componentDidMount() {
    this.fetchQuestionsAnswer();
    const SECONDS = 1000;
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, SECONDS);
  }

  componentDidUpdate(_prevProps, prevState) {
    const LIMIT_SECONDS = 1;

    if (prevState.seconds === LIMIT_SECONDS) {
      this.setState({
        disabled: true,
      }, () => {
        clearInterval(this.intervalID);
      });
    }
  }

  fetchQuestionsAnswer = async () => {
    const { history } = this.props;
    const getToken = localStorage.getItem('token');
    const fechApi = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
    const json = await fechApi.json();
    const result = json.results;
    const three = 3;
    if (json.response_code === three) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      return this.setState({ resultApi: result }, () => this.responseApi());
    }
  };

  responseApi = () => {
    const { count, resultApi } = this.state;

    const correct = resultApi[count].correct_answer;
    const incorrect = resultApi[count].incorrect_answers;
    const all = [...incorrect, correct];
    const shuffleAnswers = shuffle(all);
    if (!correct) {
      return;
    }
    this.setState({
      correct,
      incorrect,
      shuffleAnswers,
      category: resultApi[count].category,
      question: resultApi[count].question,
      level: resultApi[count].level,
    });
  };

  handleTimer = (seconds) => {
    this.setState({ seconds });
  };

  onClick = (target) => {
    const { count, level, seconds } = this.state;
    const correctAnswer = document.querySelector('.correct-answer');
    const wrongAnswer = document.querySelectorAll('.wrong-answer');
    wrongAnswer.forEach((data) => data.classList.add('wrongAnswer'));
    correctAnswer.classList.add('correctAnswer');
    this.setState((prevState) => ({
      count: count + 1,
      seconds: prevState.seconds,
      disabled: true,
      nextBtn: false,
    }), () => {
      clearInterval(this.intervalID);
    });
    const { dispatch, score, assertions } = this.props;
    let difficultyValue = 0;
    const three = 3;
    const two = 2;
    const one = 1;
    const ten = 10;
    if (target.className === 'correct-answer correctAnswer') {
      if (level === 'hard') {
        difficultyValue = three;
      } else if (level === 'medium') {
        difficultyValue = two;
      } else {
        difficultyValue = one;
      }
      const totalScore = score + (ten + (seconds * difficultyValue));
      const assertion = assertions + 1;
      dispatch(actionScore(totalScore));
      dispatch(actionAssertions(assertion));
    } else {
      dispatch(actionScore(score));
      dispatch(actionAssertions(assertions));
    }
  };

  nextQuestion = () => {
    const correctAnswer = document.querySelector('.correct-answer');
    const wrongAnswer = document.querySelectorAll('.wrong-answer');
    wrongAnswer.forEach((data) => data.classList.remove('wrongAnswer'));
    correctAnswer.classList.remove('correctAnswer');
    const max = 5;
    const { count } = this.state;
    if (count === max) {
      const { history } = this.props;
      history.push('/feedback');
    } else {
      this.fetchQuestionsAnswer();
      this.setState({
        disabled: false,
        nextBtn: true,
      });
    }
  };

  render() {
    const {
      correct,
      incorrect,
      shuffleAnswers,
      question,
      category,
      disabled,
      correctClass,
      wrongClass,
      nextBtn,
    } = this.state;
    return (
      <div>
        <h1 data-testid="question-category">{category}</h1>
        <h2 data-testid="question-text">{question}</h2>
        <Timer handleTimer={ this.handleTimer } />
        <div data-testid="answer-options">
          {
            shuffleAnswers.map((answer, i) => {
              if (answer === correct) {
                return (
                  <button
                    type="button"
                    className={ correctClass }
                    disabled={ disabled }
                    name="correct-answer"
                    data-testid="correct-answer"
                    key={ i }
                    onClick={ ({ target }) => this.onClick(target) }
                  >
                    {answer}
                  </button>
                );
              }
              const index = incorrect.indexOf(answer);
              return (
                <button
                  type="button"
                  className={ wrongClass }
                  disabled={ disabled }
                  name={ `wrong-answer-${index}` }
                  data-testid={ `wrong-answer-${index}` }
                  key={ i }
                  onClick={ ({ target }) => this.onClick(target) }
                >
                  {answer}
                </button>
              );
            })
          }
        </div>
        { nextBtn ? null : (
          <button
            type="button"
            data-testid="btn-next"
            name="nextBtn"
            onClick={ () => this.nextQuestion() }
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

QuestionsGame.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  question: PropTypes.shape({
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    category: PropTypes.string,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(QuestionsGame);
