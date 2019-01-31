import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({ seenIndexes: seenIndexes.data });
  }

  renderSeenIndexes() {
    console.log(this.state.seenIndexes);
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          <p>
            For index {key}, I calculated {this.state.values[key]}
          </p>
        </div>
      );
    }

    return entries;
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState(
      {
        seenIndexes: [
          ...this.state.seenIndexes,
          { number: parseInt(this.state.index) }
        ]
      },
      () => console.log(this.state.seenIndexes)
    );

    // await axios.post('/api/values', {
    //   index: this.state.index
    // });
    this.setState({ index: '' });
  };

  render() {
    return (
      <div className="container text-center">
        <form onSubmit={this.handleSubmit}>
          <h1 className="display-3 text-center">Calculate Fibonacci Numbers</h1>
          <hr />
          <div className="form-group text-center">
            <label htmlFor="index">Enter your index</label>
            <input
              className="form-control"
              id="index"
              type="text"
              value={this.state.index}
              onChange={event => this.setState({ index: event.target.value })}
            />
          </div>
          <button
            className="btn btn-lg btn-primary text-center"
            type="submit"
            style={{ marginBottom: '1em' }}
          >
            Submit
          </button>
        </form>

        <h3>Indexes I Have Seen:</h3>
        <hr />
        {this.renderSeenIndexes()}
        <h3>Calculated Values:</h3>
        <hr />
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
