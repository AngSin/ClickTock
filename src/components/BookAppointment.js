import React, { Component } from 'react';

export default class BookAppointment extends Component {
  render() {
    return (
      <form id="booking-panel">
        <p className="booking-entry">
          Time of Day:&nbsp;&nbsp;
          <input type="number" placeholder="hh" min="0" max="23"/>
          <input type="number" placeholder="mm" min="1" max="31"/>
        </p>
        <p className="booking-entry">Date:&nbsp;&nbsp;<input type="date" min="2018-05-27"/></p>
        <p className="booking-entry">Description:&nbsp;&nbsp;<input type="text" placeholder="Description of the appointment"/></p>
        <input type="submit" className="task-list-entry" id="booking-submit-btn" value="Book Appointment"/>
      </form>
    );
  }
}
