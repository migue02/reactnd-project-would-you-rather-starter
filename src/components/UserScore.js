import React, { Component } from 'react'
import { FaTrophy } from 'react-icons/fa'

class UserScore extends Component {

  percentage = (votes, total) => (votes * 100)/total

  render() {
    const { user, position } = this.props

    const {
      name,
      avatarURL,
      answeredQuestions,
      createdQuestions,
      score
    } = user

    return (
        <div className='section'>
          <FaTrophy className={'trophy trophy'+position} />
          <div className='result-info'>
            <div className='user-info'>
              <img
                src={avatarURL}
                alt={`Avatar of ${name}`}
                className='user-avatar'
              />
            </div>
            <div className='user'>
              <span className='user-name'>{name}</span>
              <div className='user-answered'>
                <span>Answered Questions</span>
                <span>{answeredQuestions}</span>
              </div>
              <div className='user-created'>
                <span>Created Questions</span>
                <span>{createdQuestions}</span>
              </div>
            </div>
            <div className='score'>
              <span className='score-title'>Score</span>
              <span className='score-user'>{score}</span>
            </div>
          </div>
        </div>
    )
  }
}

export default UserScore