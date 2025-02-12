import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Login from './Login'
import Nav from './Nav'
import Dashboard from './Dashboard'
import QuestionResult from './QuestionResult'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import Error from './Error'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { loading, isLogged } = this.props

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            {isLogged ? <Nav /> : null}
            {loading === true
              ? null
              : <div>
                  {isLogged
                    ? <Route path='/' exact component={Dashboard} />
                    : <Route path='/' exact component={Login} />
                  }
                  <Route path='/questions/:id' exact component={QuestionResult} />
                  <Route path='/add' exact component={NewQuestion} />
                  <Route path='/leaderboard' exact component={LeaderBoard} />
                  <Route path='/error' exact component={Error} />
                </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    loading: !users || !Object.keys(users).length,
    isLogged: authedUser !== null
  }
}

export default connect(mapStateToProps)(App)