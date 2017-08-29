import React from 'react';
import Form from './Form';
import Scroll from './scroll.js';
import './index.css';
import PropTypes from 'prop-types';

const Message = ({author, text}) => (
  <div className="Message">
    <div className="Message-author">{author}</div>
    <div className="Message-text">{text}</div>
  </div>
);

const List = ({messages}) => (
  <div className="MessagePane-List">
    {messages.map(({id, author, text}) => <Message key={id} author={author} text={text} />)}
    <Scroll />
  </div>
);

const MessagePane = ({messages, onSendMessage}) => (
  <div className="MessagePane">
    <List messages={messages} />
    <Form onSend={onSendMessage}/>
  </div>
);

MessagePane.defaultProps = {
  messages: []
};

MessagePane.propTypes = {
  messages: PropTypes.array.isRequired,
  onSendMessage: PropTypes.func.isRequired
};

export default MessagePane;
