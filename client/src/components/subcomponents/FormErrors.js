import React, { Fragment } from 'react';

export default ({ errors }) => {
  return (
    <div className="validation-errors">
      {
        errors.length > 0 &&
          <Fragment>
            <h2 className="validation--errors--label">
              { errors.length === 1 ?
                "Error"
              :
                "Errors"
              }
            </h2>
            <ul>
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
          </Fragment>
      }
    </div>
  );
};