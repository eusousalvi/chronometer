import React from 'react';
import Chronometer from './components/Chronometer';
import Partial from './components/Partial';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      partial: '',
    };
    this.setPartial = this.setPartial.bind(this);
  }

  setPartial(partial) {
    this.setState((state) => ({
      partial,
    }));
  }

  render() {
    return (
      <div>
        <Chronometer setPartial={this.setPartial} />
        <Partial partial={this.state.partial} />
      </div>
    );
  }
}

export default App;
