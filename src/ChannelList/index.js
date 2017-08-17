import React from 'react';
import PropTypes from 'prop-types';


const Channel = ({name, isSelected, onClick}) => {
  const className = isSelected ? "ChannelList-item ChannelList-item-selected" : "ChannelList-item";
  return (
    <div onClick={onClick} className={className}>{name}</div>
  );
};

class ChannelList extends React.Component {
  constructor(props) {
    super(props);
    this.state ={channels:[]};

  this.onAddChannel = this.onAddChannel.bind(this);
  }

  onAddChannel(){
    const name = window.prompt('New channel name');
    if(name !== null && name !== ""){
    const new_channel= {
      id: this.props.channels.length + 1,
      name
    };
    const channels = this.props.channels.push(new_channel);
    this.setState({ channels });
  } else { alert('No new channel was added.');
    }
}

render(channels, selectedChannelID, onSelect) {
    return (
      <div className="ChannelList">
      {
        this.props.channels.map(({id, name}) => {
        const is_selected = selectedChannelID === id;
        const onChannelSelect = () => this.props.onSelect(id);

          return <Channel key={id} name={name} isSelected={is_selected} onClick={onChannelSelect}/>
        })
      }
      <button className="ModalButton" onClick={this.onAddChannel}>Add new channel</button>
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
