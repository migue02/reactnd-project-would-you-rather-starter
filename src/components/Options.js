import React, { Component } from 'react'
import Option from './Option'
import { connect } from 'react-redux'
import { isVoted } from '../utils/helpers'

class Options extends Component {

  render() {
    const { question, authedUser } = this.props

    const {
      optionOne, optionTwo
    } = question

    const totalVotes = optionOne.votes.length + optionTwo.votes.length

    return (
        <div className='answer-info'>
          <span>Results</span>
          <Option option={optionOne} totalVotes={totalVotes} voted={isVoted(optionOne, authedUser)} />
          <Option option={optionTwo} totalVotes={totalVotes} voted={isVoted(optionTwo, authedUser)} />
        </div>
    )
  }
}
function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(Options)