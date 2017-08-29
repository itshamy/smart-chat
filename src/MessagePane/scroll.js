import React from 'react';
import ReactDOM from 'react-dom';

class Scroll extends React.Component{
  scrollToBottom = () => {
    const elem = ReactDOM.findDOMNode(this.refs.scroll);
    elem.scrollIntoView({ behavior: "smooth" });
   }

  componentDidMount() {
    this.scrollToBottom();
  }

componentDidUpdate() {
  this.scrollToBottom();
}
  render(){
    return(
      <div ref="scroll" className="empty"></div>
      );
    }
  }

export default Scroll;
