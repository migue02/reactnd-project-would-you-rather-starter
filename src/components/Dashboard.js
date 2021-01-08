import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleQuestionsData } from '../actions/shared'

class Dashboard extends Component {

  componentDidMount() {
    this.props.dispatch(handleQuestionsData())
  }

  render() {
    const { users, questions } = this.props

    console.log('users, questions', users, questions);
    return (
      <div className='center'>
        <h3>Dashboard</h3>
      </div>
    )
  }
}

function mapStateToProps ({ users, questions }) {
  return {
    users,
    questions
  }
}

export default connect(mapStateToProps)(Dashboard)