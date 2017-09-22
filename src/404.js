import React from 'react';
import './App.css';
class NotFound extends React.Component{
  render(){
    return (
      <div className="not-found">
      <img className="page-not-found" alt="page not found" src={require('./images/404.png')}/>
      <p>
      Oops! The page you're looking for doesn't exist.
      </p>
      </div>
    );
  }
}

export default NotFound;
