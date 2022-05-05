import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="bounds text-center">
      <h1>Error</h1>
      <p>Oops! Something went wrong.</p>
      <p><Link className="button" to="/">Back to Home</Link></p>
    </div>
  );
}