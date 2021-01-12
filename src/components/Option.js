import React, { Component } from 'react'
import { FcApproval } from "react-icons/fc"
import { MdCancel } from "react-icons/md"

class Option extends Component {

  percentage = (votes, total) => (votes * 100)/total

  render() {
    const { option, totalVotes, voted } = this.props

    return (
        <div className='answer'>
          <div className={'option ' + (voted ? 'voted' : '')}>
            <span>{`Would you rather ${option.text}?`}</span>
            <div className='percentage'>
              <div className='fill' style={{width: this.percentage(option.votes.length, totalVotes) + '%'}}></div>
            </div>
            <span>{`${option.votes.length} votes of totalVotes`}</span>
          </div>
          {voted
            ? <FcApproval className='voted-icon' />
            : <MdCancel color='#e0245e' className='voted-icon' />
          }
        </div>
    )
  }
}

export default Option