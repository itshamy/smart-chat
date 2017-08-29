import React from 'react';
import MessagePane from './MessagePane';
import ChannelList from './ChannelList';
import Error from './error.js';
import Modal from 'react-modal';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';

import { getMessages, getChannels, saveMessage, onNewMessage} from './storage.js';

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
      modalIsOpen: false,
      showError: false
    };
    this.onSendMessage = this.onSendMessage.bind(this);
    this.onChannelSelect = this.onChannelSelect.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onAddAuthor = this.onAddAuthor.bind(this);
    }

    openModal() {
      this.setState({modalIsOpen: true});
    }

    closeModal() {
      this.setState({modalIsOpen: false});
    }

    onAddAuthor(event){
      event.preventDefault();
      const {author} = this.state;
      this.props.onAdd(author);
      cookies.set("author", author);
      console.log(cookies.get("author", author));
      if(author.length <= 0){
        this.setState({author, modalIsOpen: true, showError: true});
      }else{
      this.setState({author, modalIsOpen: false});
    }
  }

    onChangeAuthor(event) {
      this.setState({ author: event.target.value });
    }

    onSendMessage(text, author) {
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
          onAdd={this.onAddAuthor}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick={false}
          style={customStyles}
          contentLabel="User Modal"
        >
          <h2 className="modal-title">Enter your name to start chatting</h2>
          <form>
            { this.state.showError ? <Error /> : null }
            <input
            className="author"
            type="text"
            value={this.state.author}
            onChange={this.onChangeAuthor} />
            <button className="user" onClick={this.onAddAuthor}>Start Chatting</button>
          </form>
        </Modal>
      </div>
  );
  }
}

App.propTypes = {
  onAdd: PropTypes.func.isRequired
};

App.defaultProps = {
  onAdd: () => {}
}

export default App;
