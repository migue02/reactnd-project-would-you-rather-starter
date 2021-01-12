import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'

class Nav extends Component {

    toLogin = () => {
        const { dispatch } = this.props

        dispatch(handleSetAuthedUser(null))
    }

    render() {
        const { authedUser } = this.props
        const isLogged = authedUser !== null

        return (
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='active'>
                        Home
                        </NavLink>
                    </li>
                    <li className={isLogged ? '' : 'disabled'}>
                        <NavLink to='/new' activeClassName='active'>
                        New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' activeClassName='active'>
                        Leader Board
                        </NavLink>
                    </li>
                </ul>
                    {isLogged
                        ?
                        <ul className='user-nav'>
                            <li>
                                <span>Hello, {authedUser.name}</span>
                                <img
                                    src={authedUser.avatarURL}
                                    alt={`Avatar of ${authedUser.name}`}
                                    className='avatar'
                                />
                            </li>
                            <li>
                                <NavLink to='/' activeClassName='active' onClick={this.toLogin}>
                                Logout
                                </NavLink>
                            </li>
                        </ul>
                        : null
                    }
            </nav>
        )
    }
}

function mapStateToProps ({ users, authedUser }) {
    return {
        authedUser: authedUser && users[authedUser]
    }
}

export default connect(mapStateToProps)(Nav)