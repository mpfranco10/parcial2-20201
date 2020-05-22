import React, { Component } from "react";

class Movie extends Component {
  state = this.props.movie;

  renderLikes() {
    return this.state.likes === 0 ? "Give us a like" : this.state.likes;
  }

  handleIncrement = () => {
    this.setState({ likes: this.state.likes + 1 });
  };

  render() {
    return (   
      <tr onClick={() => this.props.onDelete(this.props.movie)}  >
      <th scope="row">{this.state.id}</th>
      <td>{this.state.name}</td>
      <td>{this.state.directedBy}</td>
      <td>{this.state.country}</td>
      <td>{this.state.budget}</td>
      <td>{this.state.views}</td>
      <td>{this.state.releaseDate}</td>
    </tr>
     
    );
  }
}

export default Movie;