import React, { Component } from 'react';
import Dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';

export default class Chronometer extends Component {
  constructor(props) {
    super(props);
    this.setPartial = props.setPartial;
    this.state = {
      counter: 0,
      time: {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      },
      partial: '',
    };
    this.tick = this.tick.bind(this);
    this.stop = this.stop.bind(this);
    this.play = this.play.bind(this);
    this.clear = this.clear.bind(this);
    this.partial = this.partial.bind(this);
    Dayjs.extend(objectSupport);
  }

  tick() {
    this.setState((state) => ({
      counter: state.counter + 10,
    }));
  }

  stop() {
    this.setState((state) => ({
      time: {
        hour: this.chrono.hour(),
        minute: this.chrono.minute(),
        second: this.chrono.second(),
        millisecond: this.chrono.millisecond(),
      },
    }));
    clearInterval(this.interval);
  }

  play() {
    this.interval = setInterval(() => this.tick(), 10);
  }

  clear() {
    this.setState((state) => ({
      counter: 0,
      time: {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      },
    }));
    clearInterval(this.interval);
  }

  partial() {
    this.setPartial(this.timer);
  }

  componentDidUpdate() {
    this.chrono = Dayjs(this.state.time).add({ ms: this.state.counter });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    this.chrono = Dayjs(this.state.time).add({ ms: this.state.counter });
    const hour =
      this.chrono.hour() < 9 ? '0' + this.chrono.hour() : this.chrono.hour();
    const minute =
      this.chrono.minute() < 9
        ? '0' + this.chrono.minute()
        : this.chrono.minute();
    const second =
      this.chrono.second() < 9
        ? '0' + this.chrono.second()
        : this.chrono.second();
    const milli = this.chrono.millisecond();
    this.timer = `${hour}:${minute}:${second}:${milli}`;

    return (
      <>
        <div>
          {this.timer} <button onClick={this.stop}>Stop</button>
          <button onClick={this.play}>Play</button>
          <button onClick={this.clear}>Clear</button>
          <button onClick={this.partial}>Partial</button>
        </div>
      </>
    );
  }
}
