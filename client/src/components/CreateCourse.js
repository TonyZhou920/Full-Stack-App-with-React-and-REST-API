import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CreateCourse extends Component {
  constructor(props) {
		super(props);
    this.state = {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      errors: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.input = React.createRef();
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  handleCreate(event) {
    event.preventDefault()

    const { context } = this.props;
    const user = context.authenticatedUser;
    const { 
      courseTitle,
      courseDescription,
      estimatedTime,
      materialsNeeded
    } = this.state;

    //create course
    const newCourse = {
      title: courseTitle,
      description: courseDescription,
      estimatedTime,
      materialsNeeded,
      userId: user.userId,
    }

    context.data.createCourse(newCourse, user.emailAddress, user.password)
      .then((errors) => {
        if (errors.length) {
          this.setState( {errors} );
        } else {
            this.props.history.push("/");
        }
      }) 
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { context } = this.props;
    const user = context.authenticatedUser;

    return (
      <div className="wrap">
        <h2>Create Course</h2>
        {(this.state.errors.length) ?
          (<div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                {this.state.errors.map((error, i) => <li key={i}>{error}</li>)}
              </ul>
            </div>
          ): (null)}
        <form>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" type="text" placeholder="Title..." ref={this.input} onChange={this.handleChange}></input>

              <p>{`By ${user.firstName} ${user.lastName}`}</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription" placeholder="Write the description of your course here..." ref={this.input} onChange={this.handleChange}></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" type="text" placeholder="Estimated time in hours..." ref={this.input} onChange={this.handleChange}></input>

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded" placeholder="Write the materials your students will need for this course here..." ref={this.input} onChange={this.handleChange}></textarea>
            </div>
          </div>
          <button className="button" type="submit" onClick={this.handleCreate}>Create Course</button><Link className="button button-secondary" to="/">Cancel</Link>
        </form>
      </div>
    );
  }


}