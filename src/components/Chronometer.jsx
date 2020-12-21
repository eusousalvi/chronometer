import React, { Component } from 'react';
import Dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import '../styles/chronometer.css';
import { FaPlayCircle } from 'react-icons/fa';
import { FaPauseCircle } from 'react-icons/fa';
import { FaStopCircle } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';

export default class Chronometer extends Component {
  constructor(props) {
    super(props);
    this.setPartial = props.setPartial;
    this.clearPartials = props.clearPartials;
    this.state = {
      counter: 0,
      stoped: true,
    };
    this.options = {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    };
    this.tick = this.tick.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.partial = this.partial.bind(this);
    Dayjs.extend(objectSupport);
    this.chrono = Dayjs(this.options).add({ ms: this.state.counter });
  }

  tick() {
    this.setState((state) => ({
      counter: state.counter + 10,
      stoped: false,
    }));
  }

  pause() {
    clearInterval(this.interval);
    this.interval = null;

    this.setState((state) => ({
      stoped: true,
    }));
  }

  play() {
    this.interval = setInterval(() => this.tick(), 10);
    this.setState((state) => ({
      stoped: false,
    }));
  }

  stop() {
    this.clearPartials();
    this.chrono = Dayjs(this.options).add({ ms: 0 });
    this.setState((state) => ({
      counter: 0,
      stoped: true,
    }));
    clearInterval(this.interval);
    this.interval = null;
  }

  partial() {
    this.setPartial(this.timer);
  }

  componentDidUpdate() {
    this.chrono = Dayjs(this.options).add({ ms: this.state.counter });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    this.hour =
      this.chrono.hour() < 10 ? '0' + this.chrono.hour() : this.chrono.hour();
    this.minute =
      this.chrono.minute() < 10
        ? '0' + this.chrono.minute()
        : this.chrono.minute();
    this.second =
      this.chrono.second() < 10
        ? '0' + this.chrono.second()
        : this.chrono.second();
    this.milli =
      this.chrono.millisecond() < 10
        ? '00' + this.chrono.millisecond()
        : this.chrono.millisecond() < 100
        ? '0' + this.chrono.millisecond()
        : this.chrono.millisecond();

    this.timer = `${this.hour}:${this.minute}:${this.second}:${this.milli}`;

    return (
      <>
        <div className="chrono">
          <div className="chrono__timer">
            <div className="chrono__counter">
              {this.hour}
              <p>hour</p>
            </div>
            <div className="chrono__counter">
              {this.minute}
              <p>minutes</p>
            </div>
            <div className="chrono__counter">
              {this.second}
              <p>seconds</p>
            </div>
            <div className="chrono__milli">
              {this.milli}
              <p>milliseconds</p>
            </div>
          </div>
        </div>
        <div className="chrono__buttons">
          <button
            className="chrono__button"
            disabled={!this.state.stoped}
            onClick={this.play}
          >
            {<FaPlayCircle size={25} />}
          </button>
          <button
            className="chrono__button"
            disabled={this.state.stoped}
            onClick={this.pause}
          >
            {<FaPauseCircle size={25} />}
          </button>
          <button className="chrono__button" onClick={this.stop}>
            {<FaStopCircle size={25} />}
          </button>
          <button className="chrono__button" onClick={this.partial}>
            {<FaPlusCircle size={25} />}
          </button>
        </div>
      </>
    );
  }
}
