import React, { Component } from 'react';
import './App.css';
import Filter from '../Filter';
import TasksList from '../TasksList';
import FormAddTask from '../FormAddTask'

import tasklist from '../../tasks.json'

class App extends Component {
  render() {
    return (
      <div>
        <h1>My To Do List:</h1>
        <Filter />
        <FormAddTask />
        <TasksList tasklist={tasklist} />
      </div>
    );
  }
}

export default App;
