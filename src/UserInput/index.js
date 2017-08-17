import React, { Component } from 'react';
import Modal from 'react-modal';
import Author from './Author';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class UserInput extends Component {
  constructor(){
    super();

    this.state ={
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount(modal) {
    window.addEventListener('load', this.openModal);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = 'green';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render(){
    return (
      <div className="UserInput">
          <Modal
            onSend={this.onAddUser}
            openModal={this.openModal}
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="User Modal"
          >
            <h2 ref={subtitle => this.subtitle = subtitle}>Enter your name to start chatting</h2>
            <div>Name</div>
            <form>
              <Author />
              <button className="ModalButton" onClick={this.closeModal} >Enter</button>
            </form>
          </Modal>
        </div>
    );
  }
};

export default UserInput;
