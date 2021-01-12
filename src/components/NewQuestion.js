import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import serializeForm from 'form-serialize'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: ''
  }

  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    this.setState(() => ({
      ...this.state,
      [name]: value
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOne, optionTwo } = serializeForm(e.target, { hash: true })
    const { dispatch } = this.props

    dispatch(handleAddQuestion({
      optionOne,
      optionTwo
    }))

    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toHome: true,
    }))
  }

  render() {
    const {
      optionOne, optionTwo, toHome
    } = this.state

    const { authedUser } = this.props


    if (toHome || !authedUser) {
      return <Redirect to='/' />
    }

    return (
        <div className='section'>
          <span className='new-question-title'>Create New Question</span>
          <form className='new-question-form' onSubmit={this.handleSubmit}>
            <h4>Complete the question</h4>
            <div className='new-question-info'>
              <span>Would you rather...</span>
              <input
                placeholder='Option one...'
                name='optionOne'
                value={optionOne}
                onChange={this.handleChange}
                className='input-question'
                maxLength={280}
              />
              <span className='or'>OR</span>
              <input
                placeholder='Option two...'
                name='optionTwo'
                value={optionTwo}
                onChange={this.handleChange}
                className='input-question'
                maxLength={280}
              />
              <button
                className='btn'
                type='submit'
                disabled={optionTwo === '' || optionOne === ''}>
                  Submit
              </button>
            </div>
          </form>
        </div>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(NewQuestion)