import React, { Component } from 'react';

export default class Partial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partials: [],
    };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.partial !== this.props.partial) {
      this.setState((state) => ({
        partials: [...this.state.partials, this.props.partial],
      }));
    }
  }

  render() {
    return (
      <div>
        {this.state.partials.map((partial, index) => (
          <div key={index}>{partial}</div>
        ))}
      </div>
    );
  }
}
