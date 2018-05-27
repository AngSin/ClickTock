import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Axios from 'axios';

import Calendar from 'rc-calendar';
import 'rc-calendar/assets/index.css';
import { ROOT_URL } from '../constants/urls';
import NewTask from '../components/NewTask';
import TaskList from '../components/TaskList';
import SearchComponent from '../components/SearchComponent';
import BookAppointment from '../components/BookAppointment';
import { addTask, setTasks } from '../actions/taskActions';

class App extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      dateString: '',
      today: ''
    };
    this.appointmentHandlers = [];
  }

  componentDidMount = () => {
    const date = new Date();
    // const datePadding = date.getDate() < 10 ? '0' : '';
    // const monthPadding = date.getMonth() < 10 ? '0' : '';
    // const dateString = `${ datePadding }${ date.getDate() }/${ monthPadding }${ date.getMonth() + 1}/${ date.getFullYear() }`
    // this.setState({ today: dateString });
    this.selectDate(date);
    this.getTasks()
      .then(this.checkAppointments);
  }

  getTasks = () => new Promise((resolve, reject) => {
    this.setState({ loading: true });
    Axios.get(`${ ROOT_URL }/tasks/`)
      .then(res => res.data)
      .then(res => {
        console.log(res);
        this.props.setTasks(res);
        this.setState({ loading: false });
        resolve(res);
      })
      .catch(err => reject(err));
  });

  addTask = (dateString, task) => {
    this.props.addTask(dateString, task);
    this.checkAppointments();
  }

  checkAppointments = () => {
    const today = new Date();
    const now = today.getTime();
    const todayString = new Intl.DateTimeFormat('en-GB').format(today);
    const thisMonth = todayString.substr(3,2);
    const todayDate = todayString.substr(0, 2);
    let appointments = [];
    for (const day in this.props.tasks) {
      if (
        day.substr(3,2) > thisMonth ||
        day.substr(3,2) === thisMonth && day.substr(0,2) >= todayDate
      ) {
          appointments = [...appointments, this.props.tasks[day]];
          this.props.tasks[day].forEach((task) => {
            const day = task.date.substr(0,2);
            const month = task.date.substr(3,2);
            const year = task.date.substr(-4);
            const hrs = task.time.substr(0,2);
            const mins = task.time.substr(-2);
            let date = new Date(year, Number(month) - 1, day, hrs, mins);
            const period = date.getTime() - now;
            if (period > 0 && period <= 2147483647) {
              console.log(date.getTime() - now);
              let handleAppointment = setTimeout(() => {
                alert(task.description + "\n is starting now");
                this.setToday();
              }, period);
              this.appointmentHandlers.push(handleAppointment);
            }
          });
      }
    }
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
      dateString = `${ datePadding }${ date.getDate() }/${ monthPadding }${ date.getMonth() + 1}/${ date.getFullYear() }`
    }
    this.setState({ dateString });
  }

  setToday = () => {
    const date = new Date();
    const datePadding = date.getDate() < 10 ? '0' : '';
    const monthPadding = date.getMonth() < 10 ? '0' : '';
    const dateString = `${ datePadding }${ date.getDate() }/${ monthPadding }${ date.getMonth() + 1}/${ date.getFullYear() }`
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
            <NewTask dateString={ this.state.dateString } setToday={ this.setToday } addTask={ this.addTask }/>
            <TaskList tasks={ this.props.tasks[this.state.dateString] } />
          </div>
          <div className="home-div">
            <SearchComponent selectDate={ this.selectDate } tasks={ this.props.tasks }/>
            <BookAppointment addTask={ this.addTask }/>
          </div>
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
