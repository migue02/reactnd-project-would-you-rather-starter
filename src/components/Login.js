import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

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
    const { dispatch, id } = this.props

    dispatch(handleSetAuthedUser(userId))

    this.setState(() => ({
      userId: '',
      toHome: id ? false : true,
    }))
  }

  loginUser = (e) => {
    const { dispatch } = this.props;
    const userId = e.target.value;

    e.preventDefault();

  }

  render() {
    const { users } = this.props
    const { userId, toHome } = this.state

    if (toHome) {
      return <Redirect to='/' />
    }

    return (
      <div className='center'>
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

export default connect(mapStateToProps)(Login)