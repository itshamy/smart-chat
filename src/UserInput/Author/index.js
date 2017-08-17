import React, { Component } from 'react';

class Author extends Component{
  constructor() {
    super();
    this.state = {
      author: ''
    };
  this.onAddAuthor = this.onAddAuthor.bind(this);
  }

  onAddAuthor(event) {
    this.setState({ author: event.target.value });
  }

  render() {
    return (
      <div>
         <input
         type="text"
         value={this.state.author}
         onChange={this.onAddAuthor} />
      </div>
    );
  }
}


export default Author
