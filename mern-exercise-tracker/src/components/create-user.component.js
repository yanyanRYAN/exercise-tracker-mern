import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props); //always call when super when defining constructor of subclass
        //all react component classes that have a constructor should start it with super(props) call

        //bind the right this for each method for the context of this class
        //so that when you use this it refers to the correct one
        this.onChangeUsername = this.onChangeUsername.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);



        //set the initial state of the component
        //in react create all the variables in state!
        this.state = {
            username: '',
            
        }
    }

    onChangeUsername(e) {
        //this.state.username = "name" <-- dont do this use setState
        this.setState({
            username: e.target.value
        });
    }
    
    onSubmit(e) {
        e.preventDefault();  //prevents the default html action

        const user = {
            username: this.state.username,
        }

        console.log(user);

        //send request to backend
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data))

        //window.location = "/"; //take user back to homepage "list of exercise"

        this.setState({
            username: ''
        })
    }


    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}