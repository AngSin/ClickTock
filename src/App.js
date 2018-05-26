import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from './components/Header';
import NewTask from './components/NewTask';
import { addTask } from './actions/taskActions';

const App = (props) => 
  <div className="App">
    <Header />
    <NewTask addTask={ props.addTask }/>
  </div>

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addTask }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
