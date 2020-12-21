import React from 'react';
import Chronometer from './components/Chronometer';
import Clock from './components/Clock';
import Partial from './components/Partial';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      partials: [],
    };
    this.setPartial = this.setPartial.bind(this);
    this.clearPartials = this.clearPartials.bind(this);
  }

  setPartial(partial) {
    this.setState((state) => ({
      partials: [...this.state.partials, partial],
    }));
  }

  clearPartials() {
    this.setState({
      partials: [],
    });
  }

  render() {
    return (
      <div>
        <Chronometer
          setPartial={this.setPartial}
          clearPartials={this.clearPartials}
        />
        <Partial partials={this.state.partials} />
        <Clock />
      </div>
    );
  }
}

export default App;
