import React from 'react';
import {Link} from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="wrap">
      <h2>Not Found</h2>
      <p>Sorry! We couldn't find the page you're looking for.</p>
      <Link className="button" to="/">Return to Course Listing</Link>
    </div>
  )
}