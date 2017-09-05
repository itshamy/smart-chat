import React from 'react';
import '../App.css';
class Intro extends React.Component{
  render(){
    return (
      <div className="intro">
          <img className="intro-logo" alt="intro logo" src={require('../images/smart.png')}/>
          <h3 className="prompt"><b>← Use the side menu to access channels and chats.</b></h3>
          <div className="content">
          <p>smartchat is a React web chat app developed by Hamy Nguyen using React and Firebase.</p>
          </div>
      </div>
    );
  }
}

export default Intro;
