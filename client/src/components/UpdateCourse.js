import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UpdateCourse extends Component {
  constructor(props) {
		super(props);
		this.state = {
      courseTitle: '',
      coursedescription: '',
      estimatedTime: '',
      materialsNeeded: '',
      userId: '',
      errors: [],
		  loading: false,
		};

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    const { context } = this.props;
    const user = context.authenticatedUser;

		this.setState({ loading: true });
		fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
		  .then(response => response.json())
		  .then(data => {
        this.setState( {
        courseTitle: data.course.title,
        courseDescription: data.course.description,
        estimatedTime: data.course.estimatedTime,
        materialsNeeded: data.course.materialsNeeded,
        userId: data.course.user.id,
			  loading: false
		    });
        if (user.userId !== this.state.userId) {
          this.props.history.replace('/forbidden'); //replace used so user can't navigate back to same forbidden page. 
        }
      })
		  .catch((err) => {
        console.log('Error fetching and parsing data', err);
        this.props.history.push('/notfound');
      });
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

  handleUpdate(event) {
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
    const course = {
      title: courseTitle,
      description: courseDescription,
      estimatedTime,
      materialsNeeded,
      userId: user.userId,
    }

    //set url path
    const path = "/courses/" + this.props.match.params.id;

    context.data.updateCourse(path, course, user.emailAddress, user.password)
      .then((errors) => {
        if (errors.length) {
          this.setState( {errors} );
        } else {
            this.props.history.push(`/courses/${this.props.match.params.id}`);
        }
      }) 
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="wrap">
        <h2>Update Course</h2>
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
              <input id="courseTitle" name="courseTitle" type="text" value={this.state.courseTitle} onChange={this.handleChange}></input>

              <p>{`By ${this.props.context.authenticatedUser.firstName} ${this.props.context.authenticatedUser.lastName}`}</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription" value={this.state.courseDescription} onChange={this.handleChange}></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" type="text" value={this.state.estimatedTime} onChange={this.handleChange}></input>

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded" value= {this.state.materialsNeeded} onChange={this.handleChange}></textarea>
            </div>
          </div>
          <button className="button" type="submit" onClick={this.handleUpdate}>Update Course</button><Link className="button button-secondary" to={`/courses/${this.props.match.params.id}`}>Cancel</Link>
      </form>
    </div>
    );
  }

}