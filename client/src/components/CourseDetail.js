import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  course: [],
      user: [],
		  loading: false,
      id: this.props.match.params.id,
		};

    this.handleDelete = this.handleDelete.bind(this);
	  }

  //on component mount retrieves course data from API
	componentDidMount() {
		this.setState({ loading: true });
		fetch(`http://localhost:5000/api/courses/${this.state.id}`)
		  .then(response => {
        if (response.status === 404) {
          this.props.history.push('/notfound');
        } else if (response.status === 500 ) {
          this.props.history.push('/error');
        } else {
            return response.json()
        }
        })
		  .then(data => this.setState( {
			course: data.course,
      user: data.course.user,
			loading: false
		  }))
		  .catch((err) => {
        console.log('Error fetching and parsing data', err);
      });
	  }

	handleDelete(event) {
    event.preventDefault()

    const { context } = this.props;
    const user = context.authenticatedUser;

    //set url path
    const path = "/courses/" + this.props.match.params.id;

    context.data.deleteCourse(path, user.emailAddress, user.password)
      .then((res) => {
        this.props.history.push(`/`);
      }) 
      .catch((error) => {
        console.log(error);
        this.props.history.push('/error');
      });
	}

	render() {
    const { context } = this.props;
    const user = context.authenticatedUser;

		return (
			<div>
				<div className="actions--bar">
					<div className="wrap">
            {/* Only shows update course and delete course buttons if user is authenticated && matches course owner. */}
            {(user && user.userId === this.state.user.id) ? 
						(<React.Fragment>
              <Link className="button" to={`/courses/${this.state.id}/update`}>Update Course</Link>
              <button className="button" href="#" onClick={this.handleDelete}>Delete Course</button>
            </React.Fragment> ) : (null)}

						<Link className="button button-secondary" to="/">Return to List</Link>
					</div>
				</div>
				{(this.state.loading) ? 
          			(<div className="loader">Loading...</div>) :  
		          (<div className="wrap">
								<h2>Course Detail</h2>
								<form>
									<div className="main--flex">
										<div>
											<h3 className="course--detail--title">Course</h3>
											<h4 className="course--name">{this.state.course.title}</h4>
											<p>{`By ${this.state.user.firstName} ${this.state.user.lastName}`}</p>

											<ReactMarkdown>{this.state.course.description}</ReactMarkdown>
										</div>
										<div>
                      {(this.state.course.estimatedTime) ? 
											  (<React.Fragment>
                          <h3 className="course--detail--title">Estimated Time</h3>
                          <p>{this.state.course.estimatedTime}</p>
                        </React.Fragment>) : (null) }
                      {(this.state.course.materialsNeeded) ? 
                        (<React.Fragment>
                          <h3 className="course--detail--title">Materials Needed</h3>
                          <ul className="course--detail--list">
                              <ReactMarkdown>{this.state.course.materialsNeeded}</ReactMarkdown>
                          </ul>
                          </React.Fragment>) : (null) }
										</div>
									</div>
								</form>
							</div>
			)}			
			</div>
		);
	}

}