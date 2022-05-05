import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import UserForm from './subcomponents/UserForm';

export default class UserSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
      errors: []
    }
  }
  
  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  // submits request to Context's SignIn()
  submit = async () => {
    try {
      const { context } = this.props;
      const { from } = this.props.location.state || { from: { pathname: '/' } };
      const { emailAddress, password } = this.state;
      const user = await context.actions.signIn(emailAddress, password);

      // If there is a user, sign them in.  Otherwise, display error
      if (user !== null) {
        console.log(`SUCCESS! ${emailAddress} is now signed in!`);
        this.props.history.push(from);
      } else {
        this.setState({ errors: [ 'Sign-in was unsuccessful' ] });
      }
    } catch(err) {
      console.log(err);
      this.props.history.push('/error');
    }
  }

  cancel = () => {
    this.props.history.push('/');
  }

  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      
      <div className="container">
        <div className="col-md-6 offset-md-3 text-center signin">
          <h1>Sign In</h1>
          <UserForm 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            inputFields={() => (
              <Fragment>
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
              </Fragment>
            )}
          />

          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
   );
  }  
  
}