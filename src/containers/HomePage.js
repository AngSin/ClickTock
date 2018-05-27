import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NewTask from '../components/NewTask';
import TaskList from '../components/TaskList';
import { addTask, setTasks } from '../actions/taskActions';

const App = (props) => 
  <div className="home">
    <div>
    </div>
    <div>
      <NewTask addTask={ props.addTask }/>
      <TaskList tasks={ props.tasks } setTasks={ props.setTasks }/>
    </div>
  </div>

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addTask, setTasks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
