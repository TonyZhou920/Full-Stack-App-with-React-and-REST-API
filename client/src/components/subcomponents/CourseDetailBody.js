import React from 'react';
import ReactMarkdown from 'react-markdown';

export default ({ currentCourse, currentCourseOwner }) => {
  return (
    <div className="container">
      <div className="row course--detail">
        <div className="col-md-8">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{currentCourse.title}</h3>
            <p>By {`${currentCourseOwner.firstName} ${currentCourseOwner.lastName}`}</p>
          </div>
          <div className="course--description">
            <ReactMarkdown source={currentCourse.description} />
          </div>
        </div>
        <div className="col-md-4">
          <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item">
                <h4>Estimated Time (Hours)</h4>
                <h3>{currentCourse.estimatedTime}</h3>
              </li>
              <li className="course--stats--list--item">
                <h4>Materials Needed</h4>
                <ReactMarkdown source={currentCourse.materialsNeeded} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
