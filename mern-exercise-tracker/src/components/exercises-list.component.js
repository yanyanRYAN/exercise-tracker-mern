
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


//functional react component
//these dont have state and or lifecycle methods
//so if all you need is to accept props and return jsx use functional components
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>Edit</Link> | <a href="#" onClick={() => {props.deleteExercise(props.exercise._id)}}>Delete</a>
    </td>
  </tr>
)

//class component
export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = {exercises: []};
  }

  componentDidMount() {
    //get exercise list from db before page is rendered
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        this.setState({exercises: response.data});
      }).catch(error => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(res => console.log(res.data));

      //delete exercise thats been displayed to the user
      //if the _id of a certain element != id it will display
      // _id is the objectid in the db
      this.setState({
        exercises: this.state.exercises.filter(element => element._id !== id)
      })
  }

  exerciseList() {
    return this.state.exercises.map(currentExercise => {
      return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id} />
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.exerciseList()}
          </tbody>
        </table>
      </div>
    )
  }
}