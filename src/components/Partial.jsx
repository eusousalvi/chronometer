import React, { Component } from 'react';

export default class Partial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partials: [],
    };
  }

  componentDidUpdate() {
    this.setState((state) => ({
      partials: [...this.state.partials, this.props],
    }));
  }

  render() {
    return (
      <div>
        {this.state.partials.map((partial) => (
          <div>{partial}</div>
        ))}
      </div>
    );
  }
}
