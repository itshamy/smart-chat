import React from 'react';
import MessagePane from './MessagePane';
import ChannelList from './ChannelList';
import Error from './error.js';
import Intro from './MessagePane/intro.js';
import Modal from 'react-modal';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import Sidebar from 'react-sidebar';
import Nav from './nav.js';
import { getMessages, getChannels, saveMessage, onNewMessage} from './storage.js';
import './App.css';

const cookies = new Cookies();
const mql = window.matchMedia(`(min-width: 800px)`);
const sidebarStyles = {
    sidebar: {
        zIndex: '2',
        backgroundColor: 'rgb(225, 232, 240)',
        width: '300px',
        overflow: 'inherit'
    }
}
const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(47, 52, 61, 1)',
    flex              :'3',
    zIndex            : '4'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    maxWidth              : '400px',
    maxHeight             : '400px',
    width                 : '60%',
    padding               : '30px'
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
      showError: false,
      showIntro: true,
      showMessages: false,
      mql: mql,
      docked: false,
      open: false
    };
    this.onSendMessage = this.onSendMessage.bind(this);
    this.onChannelSelect = this.onChannelSelect.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onAddAuthor = this.onAddAuthor.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.openSidebar = this.openSidebar.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({open: open});
      }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
        this.setState({mql: mql, docked: mql.matches});
      }

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
      }

    mediaQueryChanged() {
      this.setState({
        mql: mql,
        docked: this.state.mql.matches,
      });
      }

    openSidebar(event) {
      this.setState({open: !this.state.open});

    if (event) {
      event.preventDefault();
    }
      console.log("hambuger clicked");
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
      getChannels().then(channels => this.setState({channels, selected_channel_id: channels[0].id, title:''}));
      onNewMessage(new_message => {
        const messages = [...this.state.messages, new_message];
        this.setState({messages});
      });
    }

    onChannelSelect(id) {
      let title = this.state.channels[id - 1].name;
      this.setState({ selected_channel_id: id, showIntro: false, showMessages: true, title, open: !this.state.open});
      console.log(title);
    }

    filteredMessages() {
      return this.state.messages.filter(({channel_id}) => channel_id === this.state.selected_channel_id);
    }

  render(){
    var sidebar = <ChannelList
     channels={this.state.channels}
     selectedChannelId={this.state.selected_channel_id}
     onSelect={this.onChannelSelect}
    />;
    var sidebarProps = {
      sidebar: sidebar,
      docked: this.state.docked,
      open: this.state.open,
      onSetOpen: this.onSetOpen,
    };
    return (
      <div className="App">
      <Sidebar styles={sidebarStyles}
      sidebar={sidebar}
              open={this.state.open}
              docked={this.state.docked}
              onSetOpen={this.onSetSidebarOpen}>
        { this.state.showIntro ? <div><h2 className="title">{!this.state.docked && <a onClick={this.openSidebar} href="#"><Nav/></a>}Home</h2><Intro/></div> : null }
        { this.state.showMessages ? <div className="Title">
        <h2 className="name">{!this.state.docked && <a onClick={this.openSidebar} href="#"><Nav/></a>}{this.state.title}</h2>
        <MessagePane messages={this.filteredMessages()} onSendMessage={this.onSendMessage}/>
        </div> : null }
        <Modal
          openModal={this.openModal}
          onAdd={this.onAddAuthor}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick={false}
          style={customStyles}
          contentLabel="User Modal"
        >
          <form>
            <img className="logo" alt="overlay logo" src={require('./images/smart.png')}/>
            { this.state.showError ? <Error /> : null }
            <input
            className="author"
            placeholder="Enter your name to chat"
            type="text"
            value={this.state.author}
            onChange={this.onChangeAuthor} />
            <button className="user" onClick={this.onAddAuthor}>Start Chatting</button>
          </form>
        </Modal>
        </Sidebar>
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
