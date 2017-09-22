import React from 'react';
import PropTypes from 'prop-types';
import {saveChannel} from '../storage.js';
import Footer from './footer.js';
import { NavLink } from 'react-router-dom';

const Channel = ({name, onClick}) => {
  return (
  <div onClick={onClick} className="ChannelList-item">#{name}</div>
  );
};

class ChannelList extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      channels:[]
    };

  this.onAddChannel = this.onAddChannel.bind(this);
  }

  onAddChannel(event){
    const name = window.prompt('New channel name');
    if(name !== null && name !== ""){
    const new_channel= {
      id: this.props.channels[this.props.channels.length - 1].id + 1,
      name
    };
    saveChannel(new_channel);
    const channels = this.props.channels.push(new_channel);
    this.setState({ channels });
  } else { alert('No new channel was added.');
    }
}


render(channels, onSelect, selected_channel_id) {
    return (
      <div className="ChannelList">
        {<button className="ModalButton" onClick={this.onAddChannel}>Add new channel</button>}
        {<div className="space"></div>}
        {
        this.props.channels.map(({id, name}) => {
        const onChannelSelect = () => this.props.onSelect(id);
          return <NavLink
          activeStyle={{
          fontWeight: '400',
          color: 'rgb(0, 0, 0)'
          }}
          key={id}
          exact to={`/channels/${name}`}>
          <Channel key={id} name={name} onClick={onChannelSelect}/>
          </NavLink>
        })
      }
      {<div className="space"></div>}
      {<Footer/>}
      </div>
          );
        }
}

ChannelList.defaultProps = {
    channels: []
 }

ChannelList.propTypes ={
   channels: PropTypes.array.isRequired
 }

export default ChannelList;
