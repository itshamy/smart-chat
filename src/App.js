import React from 'react';
import MessagePane from './MessagePane';
import Error from './error.js';
import Intro from './intro.js';
import Modal from 'react-modal';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import Sidebar from 'react-sidebar';
import customStyles from './modalStyle.js';
import Nav from './nav.js';
import NotFound from './404.js';
import { getMessages, getChannels, saveMessage, onNewMessage} from './storage.js';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ChannelList from './ChannelList';

const cookies = new Cookies();
const mql = window.matchMedia(`(min-width: 800px)`);
const sidebarStyles = {
    sidebar: {
        zIndex: '4',
        backgroundColor: 'rgb(225, 232, 240)',
        width: '300px',
        overflow: 'inherit'
    },
    overlay: {
   zIndex: '3'
    }
}
const channelName = window.location.pathname.split('/')[2];
const getID = (channels, channel) => {
  for (var key in channels) {
     if (channels[key].name === channel){
       return channels[key].id;
     }}};
class App extends React.Component {
  constructor(props){
    super(props);

    this.state={
      channels:[],
      messages:[],
      author:'',
      modalIsOpen: false,
      showError: false,
      mql: mql,
      docked: false,
      open: false
    };
    this.onSendMessage = this.onSendMessage.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onAddAuthor = this.onAddAuthor.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.openSidebar = this.openSidebar.bind(this);
    this.onChannelSelect = this.onChannelSelect.bind(this);
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
        } console.log("hambuger clicked");
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

    componentDidMount(modal) {
      window.addEventListener('load', this.openModal);
      getMessages().then(messages => this.setState({messages}));
      getChannels().then(channels => this.setState({channels}));
      onNewMessage(new_message => {
        const messages = [...this.state.messages, new_message];
        this.setState({messages});
      });
    }

      onSendMessage(text, author) {
        const loadId = getID(this.state.channels, channelName);
        if (this.state.selected_channel_id !== undefined){
        const new_message = {
          id: this.state.messages.length + 1,
          author: this.state.author,
          text,
          channel_id: this.state.selected_channel_id
        };
        saveMessage(new_message);
        const messages = [...this.state.messages, new_message];
        this.setState({messages});
      } else if (this.state.selected_channel_id === undefined){
        const new_message = {
          id: this.state.messages.length + 1,
          author: this.state.author,
          text,
          channel_id: loadId
        };
        saveMessage(new_message);
        const messages = [...this.state.messages, new_message];
        this.setState({messages});
      }
    }

      onChannelSelect(id) {
        this.setState({selected_channel_id: id, open: !this.state.open});
      }

render(){
    return (
      <div className="App">
      <Router>
      <div>
        <Sidebar
            styles={sidebarStyles}
            sidebar={<ChannelList channels={this.state.channels} onSelect={this.onChannelSelect}/>
                  }
            open={this.state.open}
            docked={this.state.docked}
            onSetOpen={this.onSetSidebarOpen}
            >
            <span/><span/>
            <h2 className="title">{!this.state.docked && <a onClick={this.openSidebar} href="#"><Nav/></a>}</h2>
        </Sidebar>
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
          <Switch>
          <Route exact path="/" component={Intro} />
          <Route path="/channels/:name"
    	       render={(props, key) => {
               const channel = props.match.url.split('/')[2];
               const names = this.state.channels.map(({name}) => name);
               const hasName = (names, value) => {
                 for(var id in names) {
                    if(names[id] === value) {
                      return true;
                    }}};
               const getID = (channels, channel) => {
                 for (var key in channels) {
                    if (channels[key].name === channel){
                      return channels[key].id;
                    }}};
               const id = getID(this.state.channels, channel);
               const messages = this.state.messages.filter(({channel_id}) => channel_id === id);
                  return(
                       hasName(names, channel)
                        ?
                        <div>
                     <h2 className="name">{!this.state.docked && <a onClick={this.openSidebar} href="#"><Nav/></a>}{channel}</h2>
                        <MessagePane
                            messages={messages}
                            onSendMessage={this.onSendMessage}/>
                        </div>
                        : <NotFound/>
                      )
            }}
          />
          <Route path="*" component={NotFound} />
          </Switch>
        </div>
        </Router>
      </div>
  );
  }
}
App.propTypes = {
  onAdd: PropTypes.func.isRequired,
  channels: PropTypes.array.isRequired
};

App.defaultProps = {
  onAdd: () => {},
  channels: []

}

export default App;
