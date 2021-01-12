import React, { Component } from 'react'
import { formatDate } from '../utils/helpers'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class QuestionLink extends Component {

  truncate = (input) => input.length > 15 ? `...${input.substring(0, 15)}...` : input;

  render() {
    const { question, author } = this.props

    if (question === null) {
      return <p>This question doesn't exist</p>
    }

    const {
      timestamp, id, optionOne, optionTwo
    } = question

    return (
      <Link to={`/questions/${id}`} className='question'>
        <div className='user-info'>
          <img
            src={author.avatarURL}
            alt={`Avatar of ${author.name}`}
            className='question-user-avatar'
          />
          <span className='question-user-name'>{author.name}</span>
        </div>
        <div className='question-info'>
          <div>
            <div className='question-responses'>
              <span>Would you rather...</span>
              <span>{this.truncate(optionOne.text)}</span>
              <span>{this.truncate(optionTwo.text)}</span>
            </div>
            <span className='question-date'>{formatDate(timestamp)}</span>
          </div>
          <button>View poll</button>
        </div>
      </Link>
    )
  }
}

function mapStateToProps ({ authedUser, users, questions }, { id }) {
  const question = questions[id]

  return {
    authedUser,
    question,
    author: users[question.author]
  }
}

export default connect(mapStateToProps)(QuestionLink)