import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Course from './Course';

export default class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      loading: false,
    };
  }

  //on component mount retrieves courses data from API
  componentDidMount() {
    this.setState({ loading: true });
    fetch('http://localhost:5000/api/courses/')
      .then(response => {
        if (response.status === 500) {
          this.props.history.push('/error');
        } else if (response.status === 404 ) {
          this.props.history.push('/notfound');
        } else {
            return response.json()
        }
      })        
      .then(data => this.setState( {
        courses: data.courses,
        loading: false
      }))
      .catch((err) => {
        console.log('Error fetching and parsing data', err);
      });
  }


  render() {
    let courses = this.state.courses.map((course) => {
      return <Course key ={`${course.id}`} id={`${course.id}`} title={`${course.title}`} />
    });

    return (
      <div className="wrap main--grid">
        {(this.state.loading) ? 
        <div className="loader">Loading...</div> : <React.Fragment> {courses} </React.Fragment>} 
        <Link className="course--module course--add--module" to="/courses/create">
          <span className="course--add--title">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
            New Course
          </span>
        </Link>
      </div>
    );
  }
}