import React, { Component } from 'react';

export default class Partial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partials: [],
    };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.partials !== this.props.partials) {
      this.setState((state) => ({
        partials: [...this.props.partials],
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
