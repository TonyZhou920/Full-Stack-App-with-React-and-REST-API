import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import UserForm from './subcomponents/UserForm';

export default class UserSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
      errors: [],
    }
  }
  
  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  submit = async () => {
    try {
      const { context } = this.props;
      const {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword
      } = this.state; 

      // New user payload
      const user = {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword
      };

      const response = await context.data.createUser(user);

      // Successful Signup
      if (response.status === 201) {
        await context.actions.signIn(emailAddress, password);
        this.props.history.push('/');  
        // Validation Errors
      } else if (response.status === 400) {
        this.handleErrors(response.errors);
      }
    } catch(err) {
      console.log(err);
      this.props.history.push('/error');
    }
  }

  handleErrors(err) {
    const errors = Object.values(err)[0]
      .map(item => Object.values(item)[0]);
    this.setState({ errors });
  }

  cancel = () => {
    this.props.history.push('/');
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors,
    } = this.state;

    return (
      <div className="container">
        <div className="col-md-6 offset-md-3 text-center signin">
          <h1>Sign Up</h1>
          <UserForm
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            inputFields={() => (
              <Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text" 
                  placeholder="First Name" 
                  value={firstName}
                  onChange={this.change} 
                />
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text" 
                  placeholder="Last Name" 
                  value={lastName}
                  onChange={this.change} 
                />
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text" 
                  placeholder="Email Address" 
                  value={emailAddress}
                  onChange={this.change} 
                />
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={this.change} 
                />
                <input 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  type="password"  
                  placeholder="Confirm Password" 
                  value={confirmPassword}
                  onChange={this.change} 
                />
              </Fragment>
            )}
          />

          <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
        </div>
      </div>
    );
  }
  
}