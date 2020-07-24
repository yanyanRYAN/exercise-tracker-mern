import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default class CreateExercise extends Component {
    constructor(props) {
        super(props); //always call when super when defining constructor of subclass
        //all react component classes that have a constructor should start it with super(props) call

        //bind the right this for each method for the context of this class
        //so that when you use this it refers to the correct one
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);



        //set the initial state of the component
        //in react create all the variables in state!
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    //react lifecycle method
    componentDidMount() {
        // this.setState({
        //     users: ['test user'],
        //     username: 'test user'
        // })
        //grab list of users from database
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if(response.data.length > 0){
                    //this automatically sets the page with the first user from db
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
    }

    onChangeUsername(e) {
        //this.state.username = "name" <-- dont do this use setState
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        //this.state.Description = "name" <-- dont do this use setState
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        //this.state.Duration = "name" <-- dont do this use setState
        this.setState({
            duration: e.target.value
        });
    }

    //use lib for calander
    onChangeDate(date) {
        //this.state.Date = "name" <-- dont do this use setState
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();  //prevents the default html action

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }


        console.log(exercise);

        //send json object to backend route
        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data));

        window.location = "/"; //take user back to homepage "list of exercises"
    }

    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select
                            ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map((user) => {
                                    return <option
                                        key={user}
                                        value={user}>
                                        {user}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                             />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>

                </form>
            </div>

        )
    }
}