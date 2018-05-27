import React from 'react';

const today = new Date();

export default (props) => 
  <header className="App-header">
    <h1 className="App-title">ClickTock</h1>
    <p className="header-date">Today: <strong>{ today.toString().substr(0, 15) }</strong></p>
  </header>