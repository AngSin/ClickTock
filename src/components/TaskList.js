import React, { Component } from 'react';
import { ROOT_URL } from '../constants/urls';
import Axios from 'axios';

export default class componentName extends Component {
  componentDidMount = () => {
    const date = new Date();
    const datePadding = date.getDate() < 10 ? '0' : '';
    const monthPadding = date.getMonth() < 10 ? '0' : '';
    Axios.get(`${ ROOT_URL }/tasks/${ datePadding }${ date.getDate() }${ monthPadding }${ date.getMonth() }${ date.getFullYear() }`)
      .then(res => res.data)
      .then(res => this.props.setTasks(res));
  }
  
  render() {
    return (
      <div className="task-list">
        { 
          this.props.tasks.map(task =>
            <div key={ task._id }>
              <p>Duration(hh/mm/ss): { task.duration }</p>
              <h4>{ task.description }</h4>
            </div>
          ) 
        }
      </div>
    );
  }
}