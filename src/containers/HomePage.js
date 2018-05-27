import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Axios from 'axios';

import Calendar from 'rc-calendar';
import 'rc-calendar/assets/index.css';
import Spinner from 'react-spinkit';
import { ROOT_URL } from '../constants/urls';
import NewTask from '../components/NewTask';
import TaskList from '../components/TaskList';
import SearchComponent from '../components/SearchComponent';
import BookAppointment from '../components/BookAppointment';
import { addTask, setTasks } from '../actions/taskActions';

class App extends Component  { 
  state = {
    dateString: ''
  };

  componentDidMount = () => {
    const date = new Date();
    this.selectDate(date);
    this.getTasks();
  }

  getTasks = (date) => {
    this.setState({ loading: true });
    Axios.get(`${ ROOT_URL }/tasks/`)
      .then(res => res.data)
      .then(res => {
        console.log(res);
        this.props.setTasks(res);
        this.setState({ loading: false });
      });
  }

  selectDate = (e, isString) => {
    let dateString;
    if (isString) {
      dateString = e;
    }
    else {
      const date = e;
      const datePadding = date.getDate() < 10 ? '0' : '';
      const monthPadding = date.getMonth() < 10 ? '0' : '';
      dateString = `${ datePadding }${ date.getDate() }/${ monthPadding }${ date.getMonth() }/${ date.getFullYear() }`
    }
    this.setState({ dateString });
  }

  setToday = () => {
    const date = new Date();
    const datePadding = date.getDate() < 10 ? '0' : '';
    const monthPadding = date.getMonth() < 10 ? '0' : '';
    const dateString = `${ datePadding }${ date.getDate() }/${ monthPadding }${ date.getMonth() }/${ date.getFullYear() }`
    this.setState({ dateString });
    let selectedValue = this.calendar.state.selectedValue ? this.calendar.state.selectedValue : this.calendar.state.value;
    selectedValue._d = date;
    this.calendar.setState({ selectedValue });
  }
  
  render() {
    return (
      <div className="page">
        <div className="home" style={{ opacity: this.props.loading ? 0 : 1 }}>
          <div className="home-div">
            <Calendar
              className="calendar"
              ref={ ref => this.calendar = ref }
              onSelect={ (e) => this.selectDate(e._d) }
              showDateInput={ false }
              showToday={ false }
            />
          </div>
          <div className="home-div" id="home-main">
            <NewTask dateString={ this.state.dateString } setToday={ this.setToday } addTask={ this.props.addTask }/>
            <TaskList tasks={ this.props.tasks[this.state.dateString] } />
          </div>
          <div className="home-div">
            <SearchComponent selectDate={ this.selectDate } tasks={ this.props.tasks }/>
            <BookAppointment />
          </div>
        </div> 
        {/* <div style={{
          display: 'flex',
          backgroundColor:'rgba(0,0,0,0.5)',
          justifyContent:'center',
          alignItems:'center',
          position:'absolute',
          top:0,
          bottom: 0,
          left:0,right:0,
          opacity: this.props.loading ? 1 : 0,
          zIndex: this.props.loading ? 10 : -10
        }}>
          <Spinner style={{transform: 'scale(4)'}} name={ "ball-grid-pulse" } color={ "rgb(200, 74, 81)" }/>
        </div> */}
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
