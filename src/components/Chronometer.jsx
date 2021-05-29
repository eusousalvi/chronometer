import React, { Component } from 'react';
import Dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import '../styles/chronometer.css';
import { FaPlayCircle } from 'react-icons/fa';
import { FaPauseCircle } from 'react-icons/fa';
import { FaStopCircle } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa';
import { FaStopwatch } from 'react-icons/fa';
import { FaChevronUp } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';

export default class Chronometer extends Component {
  constructor(props) {
    super(props);
    this.setPartial = props.setPartial;
    this.clearPartials = props.clearPartials;
    this.state = {
      counter: 0,
      stoped: true,
      timer: false,
    };
    this.options = {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    };
    Dayjs.extend(objectSupport);
    this.chrono = Dayjs(this.options).add({ ms: this.state.counter });
  }

  const tick = () => {
    if (this.state.timer) {
      this.setState((state) => ({
        counter: state.counter - 10,
        stoped: false,
      }));
    } else {
      this.setState((state) => ({
        counter: state.counter + 10,
        stoped: false,
      }));
    }
  }

  pause = () => {
    clearInterval(this.interval);
    this.interval = null;

    this.setState({
      stoped: true,
    });
  }

  play = () => {
    this.interval = setInterval(() => this.tick(), 10);
  }

  stop = () =>  {
    this.clearPartials();
    this.chrono = Dayjs(this.options).add({ ms: 0 });
    this.setState({
      counter: 0,
      stoped: true,
    });
    clearInterval(this.interval);
    this.interval = null;
  }

  toggleTimer = () =>  {
    this.setState((state) => ({
      timer: !state.timer,
    }));
    this.stop();
  }

  partial = () => {
    this.currentPartial = `${this.hour}:${this.minute}:${this.second}:${this.milli}`;
    this.setPartial(this.currentPartial);
  }

  addHour = () => {
    this.setState((state) => ({
      counter: state.counter + 3600000,
    }));
  }

  removeHour = () => {
    this.setState((state) =>
      state.counter > 0 ? { counter: state.counter - 3600000 } : { counter: 0 },
    );
  }

  addMinutes = () => {
    this.setState((state) => ({
      counter: state.counter + 60000,
    }));
  }

  removeMinutes = () => {
    this.setState((state) =>
      state.counter > 0 ? { counter: state.counter - 60000 } : { counter: 0 },
    );
  }
  addSeconds = () => {
    this.setState((state) => ({
      counter: state.counter + 1000,
    }));
  }

  removeSeconds = () => {
    this.setState((state) =>
      state.counter > 0 ? { counter: state.counter - 1000 } : { counter: 0 },
    );
  }

  chronoUpdate = () => {
    this.chrono = Dayjs(this.options).add({ ms: this.state.counter });
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
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate() {
    if (this.state.counter <= 0 && !this.state.stoped) {
      this.stop();
    }
  }

  render() {
    this.chronoUpdate();
    return (
      <>
        <div className="chrono">
          <div className="chrono__timer">
            <div className="chrono__counter">
              {this.state.timer && (
                <button className="chrono__button" onClick={this.addHour}>
                  <FaChevronUp size={25} color="#fff" />
                </button>
              )}
              {this.hour}
              <p>hour</p>
              {this.state.timer && (
                <button className="chrono__button" onClick={this.removeHour}>
                  <FaChevronDown size={25} color="#fff" />
                </button>
              )}
            </div>
            <div className="chrono__counter">
              {this.state.timer && (
                <button className="chrono__button" onClick={this.addMinutes}>
                  <FaChevronUp size={25} color="#fff" />
                </button>
              )}
              {this.minute}
              <p>minutes</p>
              {this.state.timer && (
                <button className="chrono__button" onClick={this.removeMinutes}>
                  <FaChevronDown size={25} color="#fff" />
                </button>
              )}
            </div>
            <div className="chrono__counter">
              {this.state.timer && (
                <button className="chrono__button" onClick={this.addSeconds}>
                  <FaChevronUp size={25} color="#fff" />
                </button>
              )}
              {this.second}
              <p>seconds</p>
              {this.state.timer && (
                <button className="chrono__button" onClick={this.removeSeconds}>
                  <FaChevronDown size={25} color="#fff" />
                </button>
              )}
            </div>
            <div className="chrono__milli">
              {this.milli}
              <p>milliseconds</p>
            </div>
          </div>
        </div>
        <div className="chrono__buttons">
          <button className="chrono__button" onClick={this.toggleTimer}>
            {this.state.timer ? (
              <FaStopwatch size={25} />
            ) : (
              <FaClock size={25} />
            )}
          </button>
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
