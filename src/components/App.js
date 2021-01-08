import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Login from './Login'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div>
        {this.props.loading === true
          ? <LoadingBar />
          : <Login />
        }
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    loading: users === {}
  }
}

export default connect(mapStateToProps)(App)