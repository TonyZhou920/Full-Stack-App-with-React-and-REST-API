import config from './config';
import axios from 'axios';

// Data class used to fetch data and return it
class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    };
  
    // set payload.  must use config obj's data prop when using axios
    if (body !== null) {
      options.data = body;
    }
   
    // Check if auth is required
    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return axios(url, options);
  }

  // Look for user and verify if credentials match 
  // returns user data OR null to Context's signIn()
  async getUser(emailAddress, password) {
    try {
      const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
      // 200 === User exists.  Return user to Context's signIn()
      if (response.status === 200) {
        return response.data;
      } else { 
        console.log(response);
        throw new Error('Something went wrong while trying to retrieve User Data!');
      }
    } catch (err) {
      // 401 === invalid credentials
      console.log(err.toJSON());
      return null;
    }
  }
  
  async createUser(user) {
    try {
      const response = await this.api('/users', 'POST', user);
      if (response.status === 201) {
        return { status: 201 };
      } else {
        console.log(response);
        throw new Error("Something went wrong while trying to create a new User!");
      }
    } catch (err) {
      // 400 === bad request, invalid data
      console.log(err.toJSON());
      return { status: 400, errors: err.response.data };
    }
  }

  // called by Courses
  async getCourses() {
    try {
      const response = await this.api('/courses', 'GET');
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  // called by CourseDetail & UpdateCourse
  async getCourse(courseId) {
    try {
      const response = await this.api(`/courses/${courseId}`, 'GET');

      if (response.status === 200) {
        return response;
      } else {
        console.log(response);
        throw new Error("Something went wrong while trying to get the course info!");
      }
    } catch(err) {
      console.log(err);
    }
  }

  // called by CreateCourse
  async createCourse(course, emailAddress, password) {
    try {
      const response = await this.api(
        '/courses',
        'POST',
        course,
        true,
        { emailAddress, password }
      );
      if (response.status === 201) {
        return { status: 201 };
      } else {
        console.log(response);
        throw new Error("Something went wrong while trying to create a new Course!");
      }
    } catch (err) {
      // 400 === bad request, invalid data
      
      console.log(err.toJSON());
      return { status: 400, errors: err.response.data };
    }
  }

  // called by UpdateCourse
  async updateCourse(course, emailAddress, password) {
    try {
      const id = course.id;
      const response = await this.api(
      `/courses/${id}`,
        'PUT',
        course,
        true,
        { emailAddress, password }
      );
      if (response.status === 204) {
        return { status: 204 };
      } else {
        console.log(response);
        throw new Error("Something went wrong while trying to update the Course!");
      }
    } catch (err) {
      // 400 === bad request, invalid data
      console.log(err.toJSON());
      return { status: 400, errors: err.response.data };
    }
  }

  // called by CourseDetail
  async deleteCourse(courseId, emailAddress, password) {
    try {
      const response = await this.api(
        `/courses/${courseId}`,
        'DELETE', 
        null, 
        true, 
        { emailAddress, password }
      );
      if (response.status === 204) {
        return { status: 204 };
      }  else {
        console.log(response);
        throw new Error("Something went wrong while trying to delete the course!");
      }
    } catch(err) {
      console.log(err);
      return err;
    }
  }
}


export default Data;