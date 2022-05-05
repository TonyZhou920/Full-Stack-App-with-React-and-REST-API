import React, { Component } from 'react';
import CourseForm from './subcomponents/CourseForm';


export default class CreateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      errors: [],
    }
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  submit = async () => {
    try {
      const { context } = this.props;
      const {
        title,
        description,
        estimatedTime,
        materialsNeeded
      } = this.state; 

      // destructure & rename
      // https://wesbos.com/destructuring-renaming/
      const { emailAddress, password, id: userId } = context.authenticatedUser; 

      // New course payload
      const course = {
        title,
        description,
        estimatedTime,
        materialsNeeded,      
        emailAddress,
        password,
        userId
      };

      const response = await context.data.createCourse(course, emailAddress, password);

      // Successful course creation
      if (response.status === 201) {
        console.log('success!', response);
        this.props.history.push('/');  
        // Validation Errors
      } else if (response.status === 400) {
        console.log('Uh oh', response);
        this.handleErrors(response.errors);
      }
    } catch(err) {
      console.log(err);
      this.props.history.push('/error');
    }
  }

  handleErrors(err) {
    const errors = Object.values(err)[0]
      .map(item => Object.values(item)[0]);
    this.setState({ errors });
  }

  cancel = () => {
    this.props.history.push('/');
  }

  render() {
    const { change, submit, cancel } = this;  
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;
    const { authenticatedUser } = this.props.context;
    
    return (
      <div className="container-fluid course--detail">
        <h1>Create Course</h1>
        
        <CourseForm 
          change={change}
          submit={submit}
          cancel={cancel}
          title={title}
          description={description}
          estimatedTime={estimatedTime}
          materialsNeeded={materialsNeeded}
          errors={errors}
          submitButtonText="Create Course"
          courseOwnerName={`${authenticatedUser.firstName} ${authenticatedUser.lastName}`}
        />
      </div>
    );
  }
}
