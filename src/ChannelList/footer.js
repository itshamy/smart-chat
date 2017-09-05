import React from 'react';
import '../App.css';


class Footer extends React.Component{
  render(){
    return(
      <div>
      <p className="small-logo">
      <img alt="footer logo" src={require('../images/smart-2.png')}/>
      </p>
      </div>
      );
    }
  }

export default Footer;
