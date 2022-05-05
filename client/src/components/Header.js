import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default ({ context }) => {
  const { authenticatedUser } = context;
  
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo"><a href="/">Courses</a></h1>
        <nav>
          {
            authenticatedUser ?
              <Fragment>
                <span>Welcome, {authenticatedUser.firstName}!</span>
                <Link className="signout" to="/signout">Sign Out</Link>
              </Fragment>
            :    
              <Fragment>
                <Link className="signup" to="/signup">Sign Up</Link>
                <Link className="signin" to="/signin">Sign In</Link>
              </Fragment>
          }
        </nav>
      </div>
    </div>
  )
}