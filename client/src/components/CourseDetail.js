import React, { Component, Fragment } from 'react';
import CourseActionsBar from './subcomponents/CourseActionsBar';
import CourseDetailBody from './subcomponents/CourseDetailBody';

export default class CourseDetail extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentCourse: {},
      currentCourseOwner: {}
    }

    this.getCourse();
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  async getCourse() {
    try {
      const { id } = this.props.match.params;
      const { context } = this.props;
      const response = await context.data.getCourse(id);
      if (response.status === 200) {
        const currentCourse = response.data;
        this.setState({ currentCourse , currentCourseOwner: currentCourse.User });
      } else if (response.status === 404) {
        this.props.history.push('/notfound');
      }
    } catch(err) {
      console.log(err);
      this.props.history.push('/error');
    }
  }

  async deleteCourse() {
    try {
      const { id } = this.props.match.params;
      const { context } = this.props;
      const { emailAddress, password } = context.authenticatedUser;
      
      const response = await context.data
        .deleteCourse(id, emailAddress, password);
      console.log("deleted ", response);
      this.props.history.push("/");
    } catch(err) {
      console.log(err);
      this.props.history.push('/error');
    }
  }

  render() {
    const { currentCourse, currentCourseOwner } = this.state;
    const { authenticatedUser } = this.props.context;

    return (
      <div>
        {
          currentCourse.hasOwnProperty("id") ?
            <Fragment>
              <CourseActionsBar
                authenticatedUser={authenticatedUser}
                currentCourseOwner={currentCourseOwner}
                currentCourse={currentCourse}
                deleteCourse={this.deleteCourse}
              />
              
              <CourseDetailBody 
                currentCourse={currentCourse}
                currentCourseOwner={currentCourseOwner}
              />
            </Fragment>
            
          :
            <Fragment>Loading</Fragment>
        }
      </div>
    );
  }
}