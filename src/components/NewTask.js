import React, { Component } from 'react';
import Axios from 'axios';
import { ROOT_URL } from '../constants/urls';

export default class AddTask extends Component {
  state = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    description: '',
    started: false
  };

  startTimer = () => {
    this.props.setToday();
    const { started } = this.state;
    this.setState({ started: !started });
    if (!started) {
      this.tick();
    }
    else {
      clearInterval(this.ticker);
    }
  }

  tick = () => {
    this.ticker = setInterval(() => {
      if (Number(this.state.seconds) < 9) {
        const seconds = Number(this.state.seconds);
        this.setState({ seconds: '0' + (seconds + 1) })
      }
      else if (Number(this.state.seconds) < 59)
        this.setState({ seconds: Number(this.state.seconds) + 1 });
      else {
        let padding = '';
        let minutes = Number(this.state.minutes);
        let hours = Number(this.state.hours);
        let hoursPadding = '';
        if (this.state.hours < 9) {
          hoursPadding = '0';
        }
        if (this.state.minutes < 9) {
          padding = '0';
        }
        else if (this.state.minutes < 59) {
          minutes++;
        }
        else {
          minutes = "0";
          hours++;
          if (hours === 23) {
            this.setState({ 
              seconds: "00",
              hours: "00",
              minutes: "00"
            });
            return;
          }
        }
        this.setState({ 
          seconds: '00', 
          minutes: padding + (minutes + 1),
          hours: hoursPadding + hours
        });
      }
    }, 1000);
  }

  addTask = () => {
    this.props.setToday();
    clearInterval(this.ticker);
    const data = {
      duration: this.state.hours + ":" + this.state.minutes + ":" + this.state.seconds,
      description: this.state.description
    }
    const url = `${ROOT_URL}/tasks`;
    const date = new Date();
    const datePadding = date.getDate() < 10 ? '0' : '';
    const monthPadding = date.getMonth() < 10 ? '0' : '';
    const dateString = `${ datePadding }${ date.getDate() }/${ monthPadding }${ date.getMonth() }/${ date.getFullYear() }`
    Axios.post(url, data)
      .then(res => res.data)
      .then(res => this.props.addTask(dateString, res.createdTask))
      .catch(err => alert(err));

    if (!this.state.description) {
      
    }
  }

  render() {
    return (
      <div id="time-tracker">
        <p>
          <input 
            type="text" 
            value={ this.state.hours + ":" + this.state.minutes + ":" + this.state.seconds }
            readOnly
          />
          <input 
            type="text" 
            value={ this.state.description }
            onChange={ e => this.setState({ description: e.target.value })}
          />
        </p>
        <p>
          <button onClick={ this.startTimer }>
            { this.state.started ? "Stop!" : "Start Clockin'" }
          </button>
          <button onClick={ this.addTask }>
            Add
          </button>
        </p>
        <p style={{ textAlign: 'center', color: 'rgb(160,160,160)' }}>{ this.props.dateString }</p>
      </div>
    );
  }
}