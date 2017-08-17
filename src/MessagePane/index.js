import React from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import './index.css';


const Message = ({author, text}) => (
  <div className="Message">
    <div className="Message-author">{author}</div>
    <div className="Message-text">{text}</div>
  </div>
);

const List = ({messages}) => (
  <div className="MessagePane-List">
  { messages.map(({id, author, text}) => <Message key={id} author={author} text={text}/>)}
  </div>
)

 const MessagePane = ({messages, onSendMessage}) => (
   <div className="MessagePane">
      <List messages={messages}/>
      <Form onSend={onSendMessage} />
   </div>
 );

 MessagePane.defaultProps = {
   messages: []
 }

 MessagePane.propTypes ={
   messages: PropTypes.array.isRequired
 }

 export default MessagePane;
