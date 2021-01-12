import React, { Component } from 'react'
import { FcApproval } from 'react-icons/fc'
import { MdCancel } from 'react-icons/md'

class Option extends Component {

  percentage = (votes, total) => Math.floor((votes * 100)/total)

  render() {
    const { option, totalVotes, voted } = this.props
    const percentage = this.percentage(option.votes.length, totalVotes)

    return (
        <div className='answer'>
          <div className={'option ' + (voted ? 'voted' : '')}>
            <span>{`Would you rather ${option.text}?`}</span>
            <div className='percentage-bar'>
              <div className='fill' style={{width: percentage + '%'}}></div>
              <span className='percentage'>{percentage + '%'}</span>
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