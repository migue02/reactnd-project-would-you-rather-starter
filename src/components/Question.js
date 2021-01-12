import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isVoted } from '../utils/helpers'
import Option from './Option'

class Question extends Component {

  percentage = (votes, total) => (votes * 100)/total

  render() {
    const { question, user, authedUser } = this.props

    if (question === null) {
      return <p>This question doesn't exist</p>
    }

    const {
      optionOne, optionTwo
    } = question

    const totalVotes = optionOne.votes.length + optionTwo.votes.length

    return (
        <div className='result'>
          <span className='result-author'>Asked by {user.name}</span>
          <div className='result-info'>
            <div className='user-info'>
              <img
                src={user.avatarURL}
                alt={`Avatar of ${user.name}`}
                className='user-avatar'
              />
            </div>
            <div className='answer-info'>
              <span>Results</span>
              <Option option={optionOne} totalVotes={totalVotes} voted={isVoted(optionOne, authedUser)} />
              <Option option={optionTwo} totalVotes={totalVotes} voted={isVoted(optionTwo, authedUser)} />
            </div>
          </div>
        </div>
    )
  }
}

function mapStateToProps ({ authedUser, users, questions }, props) {
  const { id } = props.match.params
  const question = questions[id]

  return {
    question,
    user: users[question.author],
    authedUser,
    isAnswered: Object.keys(users[authedUser].answers).includes(question.id)
  }
}

export default connect(mapStateToProps)(Question)