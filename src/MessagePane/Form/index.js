import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  constructor(props){
    super(props);

    this.state ={
      message: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  onSubmit(){
    const { message } = this.state;
    this.props.onSend(message);
    this.setState({ message: '' });
  }

  updateMessage(event){
    this.setState({ message: event.target.value})
  }

  render(){
    return (
      <div className="MessagePane-Form">
        <div className="MessagePane-Form-container">
          <p>
              <textarea
                className="message"
                value={this.state.message}
                onChange={this.updateMessage}
              />
              <button className="send" onClick={this.onSubmit}>Send</button>
          </p>
        </div>
      </div>
    );
  }
};

Form.propTypes = {
  onSend: PropTypes.func.isRequired
};

Form.defaultProps = {
  onSend: () => {}
}

export default Form
