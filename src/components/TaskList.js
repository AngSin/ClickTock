import React, { Component } from 'react';
import { ENGINE_METHOD_DIGESTS } from 'constants';

export default class componentName extends Component {
  componentDidMount = () => {
    
  }
  
  render() {
    console.log(this.props.tasks)
    return (
      <div className="task-list">
        { 
          this.props.tasks && this.props.tasks.map(task =>
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