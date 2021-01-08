import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'

class Login extends Component {

  loginUser = (e) => {
    const { dispatch } = this.props;
    const userId = e.target.value;

    e.preventDefault();

    dispatch(handleSetAuthedUser(userId))
  }

  render() {
    const { users } = this.props

    return (
      <div className='center'>
        <h3>Login</h3>
        <div className='user-list'>
          <select defaultValue={'DEFAULT'} onChange={this.loginUser}>
              <option value='DEFAULT' disabled>Select user</option>
              {Object.keys(users).map(userId => (
                  <option key={userId} value={userId}>{users[userId].name}</option>
              ))}
          </select>
      </div>
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