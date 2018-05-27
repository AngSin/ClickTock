import React, { Component } from 'react';

export default class componentName extends Component {
  state = {
    tasks: [],
    searchTerm: ''
  };

  componentDidMount = () => {
    
  }
  
  search = (e) => {
    console.log(this.props.tasks);
    e.preventDefault();
    if (this.state.searchTerm) {
      console.log("Searching");
      let tasks = [];
      for (let day in this.props.tasks) {
        console.log(day);
        this.props.tasks[day].forEach(task => {
          if (task.description.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
            tasks.push(task);
          }
        });
      }
      this.setState({ tasks });
    }
  }

  render() {
    console.log(this.state.searchTerm);
    return (
      <div>
        <form id="search-form" onSubmit={ this.search }>
          <input
            type="text"
            placeholder="Search logs"
            onChange={ e => this.setState({ searchTerm: e.target.value.trim() }) }
          />
        </form>
        {
          this.state.tasks.map(task =>
            <div key={ task._id }>
              {
                task.description
              }
            </div>
          )
        }
      </div>
    );
  }
}
