import React, { Component } from 'react'
import { MdError } from 'react-icons/md'

class Error extends Component {

  render() {
    return (
        <div className='section center'>
          <h2>ERROR 404</h2>
          <MdError color='#e0245e' className='error-icon'/>
          <h4>Question not found</h4>
        </div>
    )
  }
}

export default Error