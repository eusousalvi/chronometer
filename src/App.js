import React from 'react';
import Chronometer from './components/Chronometer';
import Partial from './components/Partial';
import './App.css';
import Header from './components/Header';
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
      <div className="app">
        <Partial partials={this.state.partials} />
        <section className="container">
          <Header />
          <Chronometer
            setPartial={this.setPartial}
            clearPartials={this.clearPartials}
          />
        </section>
      </div>
    );
  }
}

export default App;
