import React, { Component } from 'react';

export default class componentName extends Component {
  render() {
    return (
      <div className="task-list">
        { 
          this.props.tasks && this.props.tasks.map((task, index) =>
            <div key={ index } className="task-list-entry log">
              <p>
                <span>
                  { task.time } on { task.date }
                </span>
                <span>
                  <img 
                    className="duration-icon"
                    draggable="false" 
                    src={ "https://twemoji.maxcdn.com/2/72x72/1f558.png" }
                    alt={ "🕘" }
                  /> 
                  &nbsp;&nbsp;&nbsp;{ task.duration }
                </span>
              </p>
              <h4>{ task.description ? task.description : "No Description" }</h4>
            </div>
          ) 
        }
      </div>
    );
  }
}