
import React from 'react';
import MessagePane from './MessagePane';
import ChannelList from './ChannelList';
import Modal from 'react-modal';
import Cookies from 'universal-cookie';

import { getMessages, getChannels, saveMessage, onNewMessage } from './storage.js';

import './App.css';

const cookies = new Cookies();
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '500px',
    height                : '100px'
  }
};

class App extends React.Component {
  constructor(props){
    super(props);

    this.state={
      messages:[],
      channels:[],
      selectedChannelID:null,
      author:'',
      modalIsOpen: false
    };
    this.onSendMessage = this.onSendMessage.bind(this);
    this.onChannelSelect = this.onChannelSelect.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onAddAuthor = this.onAddAuthor.bind(this);
    }

    onAddAuthor(event) {
      this.setState({ author: event.target.value });
      cookies.set('author', { path: '/' });
      console.log(cookies.get('author')); 
    }

    onSendMessage(text) {
      const new_message = {
        id: this.state.messages.length + 1,
        author: this.state.author,
        text,
        channel_id: this.state.selected_channel_id
      };
      saveMessage(new_message);
      const messages = [...this.state.messages, new_message];
      this.setState({messages});
    }

    componentDidMount(modal) {
      window.addEventListener('load', this.openModal);
      getMessages().then(messages => this.setState({messages}));
      getChannels().then(channels => this.setState({channels, selected_channel_id: channels[0].id}));
      onNewMessage(new_message => {
        const messages = [...this.state.messages, new_message];
        this.setState({messages});
      });
  }


    onChannelSelect(id) {
      this.setState({ selected_channel_id: id });
    }

    filteredMessages() {
      return this.state.messages.filter(({channel_id}) => channel_id === this.state.selected_channel_id);
    }


    openModal() {
      this.setState({modalIsOpen: true});
    }


  closeModal() {
    if(this.state.author){
    this.setState({modalIsOpen: false});
  } else {
    this.setState({modalIsOpen: true});
    alert("You must enter your name first!");
  }
}

  render(){
    return (
      <div className="App">
        <ChannelList
         channels={this.state.channels}
         selectedChannelId={this.state.selected_channel_id}
         onSelect={this.onChannelSelect}
        />
        <MessagePane messages={this.filteredMessages()} onSendMessage={this.onSendMessage}/>
        <Modal
          openModal={this.openModal}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="User Modal"
        >
          <h2 className="modal-title">Enter your name to start chatting</h2>
          <form>
            <input
            className="author"
            type="text"
            value={this.state.author}
            onChange={this.onAddAuthor} />
            <button className="user" onClick={this.closeModal}>Enter</button>
          </form>
        </Modal>
      </div>
  );
  }
}

export default App;
