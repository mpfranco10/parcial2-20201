import React, { Component } from "react";

class Detail extends Component {
    state = this.props.movie;


    render() {
        return (
            <div className="card">
                <img src={this.state.poster} className="card-img-top" alt="..."></img>
                    <div className="card-body">
                        <h5 className="card-title">{this.state.name}</h5>
                        <p className="card-text">{this.state.description}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>{this.state.cast}</strong></li>
                    </ul>
            
            </div>
    );
  }
}

export default Detail;