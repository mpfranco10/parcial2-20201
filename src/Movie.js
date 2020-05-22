import React, { Component } from "react";
import { FormattedDate } from 'react-intl';
import { FormattedPlural } from 'react-intl';
import { FormattedNumber } from 'react-intl';
import { FormattedMessage } from 'react-intl';

class Movie extends Component {


  state = {
     movie : this.props.movie
    };

  renderLikes() {
    return this.state.likes === 0 ? "Give us a like" : this.state.likes;
  }

  handleIncrement = () => {
    this.setState({ likes: this.state.likes + 1 });
  };

  render() {
    return (
      <tr onClick={() => this.props.onDelete(this.props.movie)}  >
        <th>{this.state.movie.id}</th>
        <td>{this.state.movie.name}</td>
        <td>{this.state.movie.directedBy}</td>
        <td>{this.state.movie.country}</td>
        <td> 
				{this.state.movie.budget}
    <FormattedPlural value={this.state.movie.budget} one= {<FormattedMessage id="Million" />} other={<FormattedMessage id="Millions" />} />
				</td>
        

        <td>
          <FormattedDate
            value={new Date(this.state.movie.releaseDate)}
            year='numeric'
            month='long'
            day='numeric'
            weekday='long'
          />
        </td>

        <td><FormattedNumber value={this.state.movie.views} /></td>

      </tr>

    );
  }
}

export default Movie;