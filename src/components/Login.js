import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'

class Login extends Component {
  state = {
    userId: ''
  }

  handleChange = (e) => {
    const userId = e.target.value

    this.setState(() => ({
      userId
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { userId } = this.state
    const { dispatch } = this.props

    dispatch(handleSetAuthedUser(userId))

    this.setState(() => ({
      userId: '',
    }))
  }

  render() {
    const { users } = this.props
    const { userId } = this.state

    return (
      <div className='center middle-screen'>
        <h3>Login</h3>
        <form className='login-form' onSubmit={this.handleSubmit}>
          <div className='select'>
            <select defaultValue='' onChange={this.handleChange}>
                <option value='' disabled>Select user</option>
                {Object.keys(users).map(id => (
                    <option key={id} value={id}>{users[id].name}</option>
                ))}
            </select>
          </div>
          <button
            className='btn'
            type='submit'
            disabled={userId === ''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    users
  }
}

export default withRouter(connect(mapStateToProps)(Login))