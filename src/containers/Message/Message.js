import React, { Component } from 'react';
import './Message.css';
import moment from 'moment'

export default class Message extends Component {

  render() {
    const {
      text,
      isMine,
      startsSequence,
      endsSequence,
      showTimestamp,
      timestamp,
    } = this.props;

    return (
      <div className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}>
        
        {
          showTimestamp &&
          <div className="timestamp">
            {moment(timestamp).format('MM/DD/YYYY')}
          </div>
        }

        <div className="bubble-container">
          <div className="bubble" title={moment(timestamp).format('LLLL')}>
            {text}
          </div>
        </div>
      </div>
    );
  }
}
