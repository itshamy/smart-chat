
import React from 'react';
import MessagePane from './MessagePane';
import ChannelList from './ChannelList';
import Modal from 'react-modal';
import './App.css';

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

const messages = [
  {
    id: 1,
    text: 'Hello there!',
    author: 'Hamy',
    channel_id: 1
  },
  {
    id: 2,
    text: 'How are you',
    author: 'Minh',
    channel_id: 1
  },
  {
    id: 3,
    text: 'Where did you go to in Vietnam?',
    author: 'Terry',
    channel_id: 2
  },
  {
    id: 4,
    text: 'I went to Saigon.',
    author: 'James',
    channel_id: 2
  }
];

const channels = [
  {id: 1, name: 'Fashion'},
  {id: 2, name: 'Travel'},
  {id: 3, name: 'Food'},
];


class App extends React.Component {
  constructor(){
    super();

    this.state={
      messages,
      channels,
      selectedChannelID: channels[0].id,
      author:'',
      modalIsOpen: false
    };
    this.onSendMessage = this.onSendMessage.bind(this);
    this.onChannelSelect = this.onChannelSelect.bind(this);
    this.filteredMessages = this.filteredMessages.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onAddAuthor = this.onAddAuthor.bind(this);
    }

    onAddAuthor(event) {
      this.setState({ author: event.target.value });
    }

  onSendMessage(text, author){
    const new_message = {
      id: this.state.messages[this.state.messages.length-1].id + 1,
      text,
      author: this.state.author,
      channel_id: this.state.selectedChannelID
    };

    const messages = [...this.state.messages, new_message];
    this.setState({ messages });
  }

  onChannelSelect(id){
    this.setState({selectedChannelID: id});
  }

  filteredMessages(){
    return this.state.messages.filter(({channel_id}) => channel_id === this.state.selectedChannelID);
  }

  componentDidMount(modal) {
    window.addEventListener('load', this.openModal);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
  }

  closeModal() {
    if(this.state.author){
    this.setState({modalIsOpen: false});
  } else {
    this.setState({modalIsOpen: true});
  }
  }

  render(){
    return (
      <div className="App">
        <ChannelList
          channels={this.state.channels}
          selectedChannelID={this.state.selectedChannelID}
          onSelect={this.onChannelSelect}
        />
        <MessagePane messages={this.filteredMessages()} onSendMessage={this.onSendMessage}/>
        <Modal
          onSend={this.onAddUser}
          openModal={this.openModal}
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="User Modal"
        >
          <h2 className="modal-title">Enter your name to start chatting</h2>
          <form>
            <input
            className="username"
            type="text"
            value={this.state.author}
            onChange={this.onAddAuthor} />
            <button className="user" onClick={this.closeModal} >Enter</button>
          </form>
        </Modal>
      </div>
  );
  }
}
export default App
