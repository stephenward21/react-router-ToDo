import React, { Component } from 'react';
import './App.css';
import $ from 'jquery'
import {BrowserRouter as Router, Route} from 'react-router-dom'

// Custom modules
import Home from './Home'
import Delete from './Delete'
import Read from './Read'

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: []
    }
  }

  addStudent(event){

  }

  render() {

    return(
      <Router>
        <div className="to-do-app">
          <Route exact path="/" component={Home} />
          <Route path="/task/delete/:taskId" component={Delete} />
          <Route path="/task/read/:taskId" component={Read} />
        </div>
      </Router>
    )
  }
}

export default ToDo;