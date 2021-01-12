import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveQuestionAnswer } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class SubmitVote extends Component {
  state = {
    option: '',
    toHome: false
  }

  handleChange = (e) => {
    const option = e.target.value

    this.setState(() => ({
      option
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { option } = this.state
    const { dispatch, question } = this.props

    dispatch(handleSaveQuestionAnswer(question.id, option))

    this.setState(() => ({
      option: '',
      toHome: true,
    }))
  }

  render() {
    const { question } = this.props
    const { option, toHome } = this.state

    if (toHome) {
      return <Redirect to='/' />
    }

    const {
      optionOne, optionTwo
    } = question

    return (
        <div className='answer-info'>
          <span>Would You Rather ...</span>
          <form className='answer-form' onSubmit={this.handleSubmit}>
            <div className='answer-options' onChange={this.handleChange}>
              <div>
                <input
                  type='radio'
                  name='options'
                  value='optionOne'
                />
                <span className='label-option' htmlFor='optionOne'>{optionOne.text}</span>
              </div>
              <div>
                <input
                  type='radio'
                  name='options'
                  value='optionTwo'
                />
                <span className='label-option' htmlFor='optionTwo'>{optionTwo.text}</span>
              </div>
            </div>
            <button
              className='btn'
              type='submit'
              disabled={option === ''}>
                Submit
            </button>
          </form>
        </div>
    )
  }
}
function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(SubmitVote)