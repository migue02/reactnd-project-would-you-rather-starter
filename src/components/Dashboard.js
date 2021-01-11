import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleQuestionsData } from '../actions/shared'
import Question from './Question'

class Dashboard extends Component {
  state = {
    answered: false
  }

  switchQuestions = (e, answered) => {
    e.preventDefault()

    this.setState(() => ({
      answered
    }))
  }

  componentDidMount() {
    this.props.dispatch(handleQuestionsData())
  }

  render() {
    const { answered } = this.state
    const { answeredQuestions, unansweredQuestions } = this.props
    const questions = answered ? answeredQuestions : unansweredQuestions

    return (
      <div className='center'>
        <div className='tabs'>
          <button
            className={'tab ' + (answered ? '': 'selected')}
            onClick={(e) => this.switchQuestions(e, false)}>
              Unanswered Questions
          </button>
          <button
            className={'tab ' + (answered ? 'selected': '')}
            onClick={(e) => this.switchQuestions(e, true)}>
              Answered Questions
          </button>
        </div>
        {questions.map((question) => (
          <li key={question.id}>
            <Question id={question.id} ></Question>
          </li>
        ))}
      </div>
    )
  }
}

function mapStateToProps ({ questions, users, authedUser }) {
  const user = users[authedUser]

  const answeredQuestions = Object.keys(questions)
    .filter(id => Object.keys(user.answers).includes(id))
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    .map((id) => questions[id])

  const unansweredQuestions = Object.keys(questions)
    .filter(id => !Object.keys(user.answers).includes(id))
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    .map((id) => questions[id])

  return {
    answeredQuestions: answeredQuestions,
    unansweredQuestions: unansweredQuestions,
  }
}

export default connect(mapStateToProps)(Dashboard)