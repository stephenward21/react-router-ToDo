import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state={
      // theClass: [],
      // teacher: "Rob"
    }

    this.addStudent = this.addStudent.bind(this);
  }

  componentDidMount() {
    $.getJSON('http://localhost:3000/getStudents', (studentsFromApi)=>{
      console.log(studentsFromApi)
      this.setState({
        theClass: studentsFromApi
      })

    });
  }

  addStudent(event){
    var studentToAdd = event.target.parentNode.childNodes[0].value;
    // console.log(studentToAdd);
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/addStudent",
      data: {name: studentToAdd}
    }).done((studentsArray)=>{
      this.setState({
        theClass: studentsArray
      })
    });
  }

  render() {
    var theClassArray = [];
    this.state.theClass.map((student, index)=>{
      theClassArray.push(<li key={index}>{student.name}</li>)

    });

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="add-box">
          <input type="text" id="newStudent"/>
          <button onClick={this.addStudent}>Add Student</button>
        </div>
        <p>
          {theClassArray}
        </p>
      </div>
    );
  }
}

export default ToDo;