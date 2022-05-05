import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="bounds text-center">
      <h1>Not Found</h1>
      <p>Sorry! We couldn't find the page you're looking for.</p>
      <p><Link className="button" to="/">Back to Home</Link></p>
    </div>
  );
}