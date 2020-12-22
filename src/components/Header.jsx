import React, { Component } from 'react';
import Clock from './Clock';
import '../styles/header.css';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1 className="header__title">chronometer</h1>
        <Clock />
      </header>
    );
  }
}
