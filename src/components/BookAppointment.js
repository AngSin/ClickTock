import React, { Component } from 'react';
import Axios from 'axios';
import { ROOT_URL } from '../constants/urls';

export default class BookAppointment extends Component {
  state = {
    date: ' ',
    hrs: ' ',
    mins: ' ',
    description: ' ',
    today: new Date()
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
      duration: "Booked Appointment"
    };

    Axios.post(`${ROOT_URL}/tasks/appointments/`, appointment)
      .then(res => res.data)
      .then(res => {
        console.log(res);
        this.props.addTask(dateString, appointment);
        this.setState({ 
          date: ' ',
          hrs: ' ',
          mins: ' ',
          description: ' ',
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
            required
          />
          <input 
            type="number" 
            placeholder="mm" 
            min="0" max="59" 
            onChange={ e => this.setState({ mins: e.target.value }) }
            value={ this.state.mins }
            required
          />
        </p>
        <p className="booking-entry">
          Date:&nbsp;&nbsp;
          <input 
            type="date" 
            min={ 
              this.state.today.getFullYear() + "-" + (this.state.today.getMonth() + 1 < 10 ? "0" : "") 
              + (this.state.today.getMonth() + 1) + "-" + (this.state.today.getDate() < 10 ? "0" : "")
              + this.state.today.getDate()
            }
            onChange={ e => this.setState({ date: e.target.value }) }
            value={ this.state.date }
            required
          />
        </p>
        <p className="booking-entry">
          Description:&nbsp;&nbsp;
          <input 
            type="text" 
            placeholder="Description of the appointment" 
            onChange={ e => this.setState({ description: e.target.value }) }
            value={ this.state.description }
            required
          />
        </p>
        <input type="submit" className="task-list-entry add-button" id="booking-submit-btn" value="Book Appointment"/>
      </form>
    );
  }
}
