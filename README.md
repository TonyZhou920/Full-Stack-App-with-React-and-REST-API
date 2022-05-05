### Team Treehouse Full Stack JavaScript Techdegree

## Unit 10 Project: Full Stack App with React and a REST API

**Summary:** This is a full stack application with React handling the front end and express handling the back end.  It's a course manager where users can view others' courses or they can sign up and manage their own courses.

Users can only update/delete their own courses.  Furthermore, users must be signed in if they would like to create new courses.  Users are given friendly errors when an error occurs, such as form validation errors or 404 errors.

In summary, this project has helped me become learn how to create a full stack REST application with user authentication.  

**How to use**:

1. Download the project files and extract the folder to your computer.
2. Open two terminals/command prompts and navigate to the `api` and `client` directories for this project.
3. In both the `api` and `client` directories, run the command `npm install` to install the project's dependencies.
4. In the `api` directory, run the command `npm run seed` to create the initial database.
5. In both the `api` and `client` directories, run the command `npm start` to start the app.    
6. Open your internet browser and navigate to [http://localhost:3000](http://localhost:3000) to view and use the app.


**Extra Credit**

1. JS: Added user friendly display error messages for NotFound, Forbidden, and UnhandledError.
2. JS: User credentials persist as a HTTP cookie on the user's browser.
3. JS: Users are redirected back to the correct location after signing in.  Example: If the user trys to access /courses/create while they aren't logged in, they will be asked to sign in.  After signing in, they will be redirected to the course  creation page.
