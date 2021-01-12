import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleQuestionsData } from '../actions/shared'
import UserScore from './UserScore'

class LeaderBoard extends Component {
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
    const { leaderBoardUsers } = this.props

    return (
      <div className='center'>
        {leaderBoardUsers.map((user, index) => (
          <li className='user-score-item' key={user.id}>
            <UserScore user={user} position={index + 1}/>
          </li>
        ))}
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  const leaderBoardUsers = Object.keys(users)
    .map(id => {
      const user = users[id]

      return {
        id,
        name: user.name,
        avatarURL: user.avatarURL,
        answeredQuestions: Object.keys(user.answers).length,
        createdQuestions: user.questions.length,
        score: Object.keys(user.answers).length + user.questions.length,
      }
    })
    .sort((a,b) => b.score - a.score)

  return {
    leaderBoardUsers
  }
}

export default connect(mapStateToProps)(LeaderBoard)