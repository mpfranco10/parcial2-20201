import React, { Component } from "react";
import Movie from "./Movie";
import Detail from "./Detail";
import { FormattedMessage } from 'react-intl';
import * as d3 from "d3";

class Movies extends Component {

  componentDidMount() {
    if (!navigator.onLine) {
      if (localStorage.getItem('movies') === null)
        this.setState({ movies: [] })
      else {
        let peliculas = JSON.parse(localStorage.getItem('movies'));
        console.log(peliculas);
        this.setState({ movies: peliculas});
      }
    }
      let link = ""
      if (this.props.locale === "en") {
        link = "https://gist.githubusercontent.com/josejbocanegra/8b436480129d2cb8d81196050d485c56/raw/48cc65480675bf8b144d89ecb8bcd663b05e1db0/data-en.json";
      }
      else if (this.props.locale === "es") {
        link = "https://gist.githubusercontent.com/josejbocanegra/f784b189117d214578ac2358eb0a01d7/raw/2b22960c3f203bdf4fac44cc7e3849689218b8c0/data-es.json";
      }

      fetch(link)
        .then(res => {
          return res.json();
        }).then(movies => {

          this.setState({ movies });
          this.drawChart(movies);
          localStorage.setItem('movies', JSON.stringify(movies));
        });
    
  }

  state = {
    movies: [],
    clicked: false,
    movie: {},
    lang: this.props.locale
  };

  handleDelete = movie => {
    console.log(this.state.movie)
    this.setState({ movie: movie })
    this.setState({ clicked: true })
  };

  renderDetail() {
    if (this.state.clicked) {
      return <Detail key={this.state.movie.name} movie={this.state.movie} id={this.state.movie.id} />;
    }
    else {
      return "";
    }
  }

  drawChart(data) {


    const canvas = d3.select("#canvas");
    const width = 700;
    const height = 500;
    const margin = { top: 10, left: 200, bottom: 40, right: 10 };
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - margin.bottom;

    const svg = canvas.append("svg");
    svg.attr("width", width);
    svg.attr("height", height);

    let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const y = d3.scaleLinear()
      .domain([0, 10000000])
      .range([iheight, 0]);

    const x = d3.scaleBand()
      .domain(data.map(d => d.id))
      .range([0, iwidth])
      .padding(0.1);

    const bars = g.selectAll("rect").data(data);

    bars.enter().append("rect")
      .attr("class", "bar")
      .style("fill", "steelblue")
      .attr("x", d => x(d.id))
      .attr("y", d => y(d.views))
      .attr("height", d => iheight - y(d.views))
      .attr("width", x.bandwidth())

    g.append("g")
      .classed("x--axis", true)
      .call(d3.axisBottom(x))
      .attr("transform", `translate(0, ${iheight})`);

    g.append("g")
      .classed("y--axis", true)
      .call(d3.axisLeft(y));
  }

  renderPlot() {
    return <div ref="canvas"></div>;
  }

  render() {
    return (
      <div>

        <nav className="navbar navbar-light" style={{ backgroundColor: "#00CED8" }}>
          <span className="navbar-brand mb-0 h1"><FormattedMessage id="Header" /></span>
        </nav>

        <div className="row">
          <div className="col-9">
            <table className="table table-striped" style={{ marginLeft: "10px" }}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col"> <FormattedMessage id="Name" /></th>
                  <th scope="col"> <FormattedMessage id="Directedby" /></th>
                  <th scope="col"> <FormattedMessage id="Country" /></th>
                  <th scope="col"> <FormattedMessage id="Budget" /></th>
                  <th scope="col"> <FormattedMessage id="Release" /></th>
                  <th scope="col"> <FormattedMessage id="Views" /></th>
                </tr>
              </thead>
              <tbody>

                {this.state.movies.map(t => (
                  <Movie movie={t} id={t.id} key={t.id} onDelete={this.handleDelete} />
                ))}

              </tbody>
            </table>
          </div>
          <div className="col-3">
            {this.renderDetail()}
          </div>
        </div>

        <div>
          <hr></hr>
          <h1>Vistas por id de película</h1>
          {this.renderPlot()}
        </div>

      </div>
    );
  }
}

export default Movies;