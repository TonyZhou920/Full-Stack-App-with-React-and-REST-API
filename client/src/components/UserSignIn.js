import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UserSignIn extends Component {
  constructor(props) {
		super(props);
    this.state = {
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
    const { emailAddress, password } = this.state;

    context.actions.signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          this.setState(() => {
            return { errors: ['Sign-in was unsuccessful. Please try again.']};
          }); 
        } else {
          this.props.history.push(from); //returns user to previous location after redirected signin.
        }
      }) 
      .catch((error) => {
        console.log(error);
      });
    }

  render() {
    return (
      <div className="form--centered">
        <h2>Sign In</h2>
        {(this.state.errors.length) ?
          (<div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                {this.state.errors.map((error, i) => <li key={i}>{error}</li>)}
              </ul>
            </div>
          ): (null)}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" placeholder="Email Address" onChange={this.handleChange}></input>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="Password" onChange={this.handleChange}></input>
          <button className="button" type="submit">Sign In</button><Link className="button button-secondary" to='/'>Cancel</Link>
        </form>
        <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
        
      </div>
    );
  }



}