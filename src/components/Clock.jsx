import React, { Component } from 'react';
import Dayjs from 'dayjs';

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
    return <div>{this.state.hour}</div>;
  }
}
