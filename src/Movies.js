import React, { Component } from "react";
import Movie from "./Movie";
import Detail from "./Detail";
class Movies extends Component {

  componentDidMount() {
    if (!navigator.onLine) {
        if (localStorage.getItem('movies') === null)
            this.setState({ movies: "loading..." })
        else
            this.setState({ movies: localStorage.getItem('movies') });
    }
    fetch("https://gist.githubusercontent.com/josejbocanegra/f784b189117d214578ac2358eb0a01d7/raw/2b22960c3f203bdf4fac44cc7e3849689218b8c0/data-es.json")
      .then(res => {
          return res.json();
      }).then(movies => {
          this.setState({ movies });
          localStorage.setItem('movies', movies);
      });
  }

  state = {
    movies: [],
    clicked: false,
    movie: {}
  };

  handleDelete = movie => {
    console.log(this.state.movie)
    this.setState({ movie: movie})
    this.setState({ clicked: true})
  };

  renderDetail() {
    if (this.state.clicked){
      return <Detail key={this.state.movie.name}  movie={this.state.movie} id={this.state.movie.id}/>;
    }
    else{
      return "";
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-8">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Directed</th>
                  <th scope="col">Country</th>
                  <th scope="col">Budget</th>
                  <th scope="col">Release</th>
                  <th scope="col">Views</th>
                </tr>
              </thead>
              <tbody>

                {this.state.movies.map(t => (
                  <Movie movie={t} id={t.id} onDelete={this.handleDelete} />
                ))}

              </tbody>
            </table>
          </div>
          <div className="col-4">
          {this.renderDetail()}
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;