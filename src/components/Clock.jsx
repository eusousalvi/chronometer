import React, { Component } from 'react';
import Dayjs from 'dayjs';
import '../styles/clock.css';

export default class Clock extends Component {
  constructor() {
    super();
    this.state = {
      hour: Dayjs().format('HH:mm:ss'),
    };
    this.tick = this.tick.bind(this);
  }

  tick() {
    this.timer = Dayjs().format('HH:mm:ss');
    this.setState((state) => ({ hour: this.timer }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div className="clock">{this.state.hour}</div>;
  }
}
