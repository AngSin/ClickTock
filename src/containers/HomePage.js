import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Axios from 'axios';

import Calendar from 'rc-calendar';
import 'rc-calendar/assets/index.css'
import { ROOT_URL } from '../constants/urls';
import NewTask from '../components/NewTask';
import TaskList from '../components/TaskList';
import SearchComponent from '../components/SearchComponent';
import { addTask, setTasks } from '../actions/taskActions';

class App extends Component  { 
  constructor(props) {
    super(props);
    this.state = {
      dateString: ''
    };
    this.calendar = React.createRef();
  }
  componentDidMount = () => {
    const date = new Date();
    this.selectDate(date);
    this.getTasks();
  }

  getTasks = (date) => {
    Axios.get(`${ ROOT_URL }/tasks/`)
      .then(res => res.data)
      .then(res => {
        console.log(res);
        this.props.setTasks(res);
      });
  }

  selectDate = (e) => {
    const date = e;
    const datePadding = date.getDate() < 10 ? '0' : '';
    const monthPadding = date.getMonth() < 10 ? '0' : '';
    const dateString = `${ datePadding }${ date.getDate() }/${ monthPadding }${ date.getMonth() }/${ date.getFullYear() }`
    this.setState({ dateString });
  }

  setToday = () => {
    const date = new Date();
    let selectedValue = this.calendar.state.selectedValue ? this.calendar.state.selectedValue : this.calendar.state.value;
    selectedValue._d = date;
    this.calendar.setState({ selectedValue });
  }
  
  render() {
    return (
      <div className="home">
        <div className="home-div">
          <Calendar
            className="calendar"
            ref={ ref => this.calendar = ref }
            onSelect={ (e) => this.selectDate(e._d) }
            showDateInput={ false }
          />
        </div>
        <div className="home-div" id="home-main">
          <NewTask dateString={ this.state.dateString } setToday={ this.setToday } addTask={ this.props.addTask }/>
          <TaskList tasks={ this.props.tasks[this.state.dateString] } />
        </div>
        <div className="home-div" id="search-component">
          <SearchComponent tasks={ this.props.tasks }/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addTask, setTasks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
