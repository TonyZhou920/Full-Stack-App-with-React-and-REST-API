import React from 'react';
import {Link} from 'react-router-dom';

export default function Forbidden() {
  return (
    <div className="wrap">
      <h2>Forbidden</h2>
      <p>Oh oh! You can't access this page.</p>
      <Link className="button" to="/">Return to Course Listing</Link>
    </div>
  )
}