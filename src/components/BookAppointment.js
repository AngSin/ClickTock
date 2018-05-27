import React, { Component } from 'react';
import Axios from 'axios';
import { ROOT_URL } from '../constants/urls';

export default class BookAppointment extends Component {
  state = {
    date: '',
    hrs: '',
    mins: '',
    description: '',
  };

  submit = (e) => {
    e.preventDefault();
    const { hrs, date, mins, description } = this.state;
    const year = date.substr(0,4);
    const month = date.substr(5,2);
    const day = date.substr(8,2);
    const hrsPadding = hrs < 10 && !hrs.startsWith("0") ? '0' : '';
    const minsPadding = mins < 10 && !mins.startsWith("0") ? '0' : '';
    const dateString = `${day}/${month}/${year}`;
    const appointment = {
      time: `${hrsPadding}${hrs}:${minsPadding}${mins}`,
      date: dateString,
      description,
      duration: "00:00:00"
    };

    Axios.post(`${ROOT_URL}/tasks/appointments/`, appointment)
      .then(res => res.data)
      .then(res => {
        console.log(res);
        this.props.addTask(dateString, appointment);
        this.setState({ 
          date: '',
          hrs: 0,
          mins: 0,
          description: '',
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <form id="booking-panel" onSubmit={ this.submit }>
        <p className="booking-entry">
          Time of Day:&nbsp;&nbsp;
          <input 
            type="number" 
            placeholder="hh"
            min="0" max="23" 
            onChange={ e => this.setState({ hrs: e.target.value }) }
            value={ this.state.hrs }
          />
          <input 
            type="number" 
            placeholder="mm" 
            min="0" max="59" 
            onChange={ e => this.setState({ mins: e.target.value }) }
            value={ this.state.mins }
          />
        </p>
        <p className="booking-entry">
          Date:&nbsp;&nbsp;
          <input 
            type="date" 
            min="2018-05-27" 
            onChange={ e => this.setState({ date: e.target.value }) }
            value={ this.state.value }
          />
        </p>
        <p className="booking-entry">
          Description:&nbsp;&nbsp;
          <input type="text" placeholder="Description of the appointment" onChange={ e => this.setState({ description: e.target.value }) }/>
        </p>
        <input type="submit" className="task-list-entry" id="booking-submit-btn" value="Book Appointment"/>
      </form>
    );
  }
}
