import React, { Component } from 'react';

export default class componentName extends Component {
  state = {
    tasks: [],
    searchTerm: ''
  };
  
  search = (e) => {
    e.preventDefault();
    let tasks = [];
    if (this.state.searchTerm) {
      for (let day in this.props.tasks) {
        this.props.tasks[day].forEach(task => {
          if (task.description.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
            tasks.push(task);
          }
        });
      }
    }
    this.setState({ tasks });
  }

  render() {
    return (
      <div id="search-component">
        <form id="search-form" onSubmit={ this.search }>
          <input
            type="text"
            placeholder="Search logs"
            onChange={ e => this.setState({ searchTerm: e.target.value.trim() }) }
          />
        </form>
        <div id="search-results">
          {
            this.state.tasks.length > 0 ?
              this.state.tasks.map(task =>
                <div
                  key={ task._id } 
                  className="task-list-entry"
                  onClick={ () =>  this.props.selectDate(task.date, true) }
                  style={{ cursor: 'pointer' }}
                >
                  {
                    task.description
                  }
                </div>
              )
                :
            <p style={{ textAlign: 'center', fontSize: 16 }}>—</p>
          }
        </div>
      </div>
    );
  }
}
