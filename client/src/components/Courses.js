import React, { Component, Fragment } from 'react';
import CourseList from './subcomponents/CourseList';
import NewCourseButton from './subcomponents/NewCourseButton';

export default class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    }

    this.getCourses();
  }

  async getCourses() {
    try {
      const { context } = this.props;
      const { data: courses } = await context.data.getCourses();
      this.setState({ courses });
    } catch (err) {
      console.log(err);
      this.props.history.push('/error');
    }
  }
  
  render() {
    const { courses } = this.state;
    const { authenticatedUser } = this.props.context;

    return (
      <div className="container-fluid">
      {
        courses ?
          <div className="row">
            <CourseList courses={courses} />
            <NewCourseButton authenticatedUser={authenticatedUser} />
          </div>
          
        :
          <Fragment>Loading</Fragment>
      }
      </div>
    );
  }
  
}