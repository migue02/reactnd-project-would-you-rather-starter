import React, { Component } from 'react'
import { connect } from 'react-redux'
import Options from './Options'
import SubmitVote from './SubmitVote'
import { Redirect } from 'react-router-dom'
import Login from './Login'
class QuestionResult extends Component {

  percentage = (votes, total) => (votes * 100)/total

  render() {
    const { question, user, isAnswered, authedUser } = this.props

    if (!authedUser) {
      return <Login />
    }

    if (!question) {
      return <Redirect to='/error' />
    }

    return (
        <div className='section'>
          <span className='result-author'>Asked by {user.name}</span>
          <div className='result-info'>
            <div className='user-info'>
              <img
                src={user.avatarURL}
                alt={`Avatar of ${user.name}`}
                className='user-avatar'
              />
            </div>
            {isAnswered ? <Options question={question}/> : <SubmitVote question={question}/>}
          </div>
        </div>
    )
  }
}

function mapStateToProps ({ authedUser, users, questions }, props) {
  const { id } = props.match.params
  const question = questions[id]

  if (!question) {
    return {
      authedUser
    }
  }

  return {
    question,
    user: users[question.author],
    isAnswered: authedUser && Object.keys(users[authedUser].answers).includes(question.id),
    authedUser
  }
}

export default connect(mapStateToProps)(QuestionResult)