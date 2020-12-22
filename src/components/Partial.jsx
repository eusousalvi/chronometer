import React, { Component } from 'react';
import '../styles/partial.css';

export default class Partial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partials: [],
    };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.partials !== this.props.partials) {
      this.setState({
        partials: [...this.props.partials],
      });
    }
  }

  render() {
    return (
      <div
        className={`partial ${this.state.partials.length > 0 ? 'active' : ''}`}
      >
        <div className="partial__title">
          <h2>partials</h2>
        </div>
        <ol>
          {this.state.partials.map((partial, index) => (
            <li key={index}>{partial}</li>
          ))}
        </ol>
      </div>
    );
  }
}
