import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="bounds text-center">
      <h1>Forbidden</h1>
      <p>Oh no!  You can't access this page</p>
      <p><Link className="button" to="/">Back to Home</Link></p>
    </div>
  );
}