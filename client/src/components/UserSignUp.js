import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UserSignUp extends Component {
  constructor(props) {
		super(props);
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      errors: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  handleSubmit(event) {
    event.preventDefault()

    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { 
      firstName,
      lastName,
      emailAddress, 
      password 
    } = this.state;

    //create user
    const newUser = {
      firstName,
      lastName,
      emailAddress, 
      password 
    }

    context.data.createUser(newUser)
      .then((errors) => {
        if (errors.length) {
          this.setState( { errors } );
        } else {
          context.actions.signIn(emailAddress, password)
            .then(() => {
              this.props.history.push(from);
            });
        }
      }) 
      .catch((error) => {
        console.log(error);
      });
    }

  render() {

    return (
      <div className="form--centered">
          <h2>Sign Up</h2>
          {(this.state.errors.length) ?
          (<div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                {this.state.errors.map((error, i) => <li key={i}>{error}</li>)}
              </ul>
            </div>
          ): (null)}
          <form>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" name="firstName" type="text" placeholder="First Name" onChange={this.handleChange}></input>
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" name="lastName" type="text" placeholder="Last Name" onChange={this.handleChange}></input>
            <label htmlFor="emailAddress">Email Address</label>
            <input id="emailAddress" name="emailAddress" type="email" placeholder="Email Address" onChange={this.handleChange}></input>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="password" onChange={this.handleChange}></input>
            <button className="button" type="submit" onClick={this.handleSubmit}>Sign Up</button><Link className="button button-secondary" to="/">Cancel</Link>
          </form>
          <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
      </div>

    );
  }

}