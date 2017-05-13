# Document Mangement System
[![Build Status](https://travis-ci.org/andela-opikuda/documentManagementSystem.svg?branch=develop)](https://travis-ci.org/andela-opikuda/documentManagementSystem) [![Code Climate](https://codeclimate.com/github/andela-opikuda/documentManagementSystem/badges/gpa.svg)](https://codeclimate.com/github/andela-opikuda/documentManagementSystem) [![Coverage Status](https://coveralls.io/repos/github/andela-opikuda/documentManagementSystem/badge.svg?branch=refactor)](https://coveralls.io/github/andela-opikuda/documentManagementSystem?branch=refactor)
## Background Information
Document management system is an application used to track, manage and store documents.
## Features
* Users can sign up/ log into the application
* Regular Users see a dashboard upon sign up/ log in where they can
  * Create documents
    * Documents have different access levels (public, private and role).
  * Edit documents
  * Delete documents
  * View their documents
  * View other users documents on public or role access
  * Search for documents
  * Search for users
* Admin users from their dashboard can
  * View all users
  * View all public documents
  * Delete any user
  * Create new roles
  * Update users records
  * View all created roles
  * Search for users
  * Search for documents
  
**Documents**:
Documents can be created and must have:
- title
- content
- access; set by default to public but can be any of `private, public or role`


**Authentication**:
Users are authenticated and validated using JSON web token (JWT).
By generating a token on registration and login, API endpoints and documents are protected from unauthorised access.
Requests to protected routes are validated using the generated token.

## Why is this project useful
* It enables proper and easy management, distribution and protection of documents.
## How users can get started with the project
- By clicking on the [Production app](https://pk-dms.herokuapp.com/)
## Technologies Used
---
- [Node js](https://nodejs.org/en/) is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Materialize css](http://materializecss.com/) makes styling responsive web pages faster and easier.
- [Mocha](https://mochajs.org/)is a feature-rich JavaScript test framework running on Node.js and in the browser used for asynchronous testing.
- [Chai](https://chaijs.com/) is a BDD / TDD assertion library for node and the browser that can be paired with any javascript testing framework.
- [Istanbul](https://istanbul.js.org/) Istanbul instruments your ES5 and ES2015+ JavaScript code with line counters, so that you can track how well your unit-tests exercise your codebase.
- [Eslint](http://eslint.org/) provides a pluggable linting utility for JavaScript.
- [Hound CI](https://houndci.com/) comments on style violations in GitHub pull requests.
- [Travis CI](https://travis-ci.org/) a hosted continuous integration and delivery service for GitHub projects.
- [Express js](http://expressjs.com/) handles backend routing.
- [Nodemon](https://nodemon.io/)monitors any changes in your source and restarts the browser.
- [Coveralls](https://coveralls.io/) shows the parts of your code that are not covered by your test suite.
- [Sequelize](http://docs.sequelizejs.com/) Sequelize is a promise-based ORM for Node.js and io.js. It supports the dialects PostgreSQL, MySQL, MariaDB, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
- [PostgreSQL](https://www.postgresql.org/) A powerful, open source object-relational database system.
- [React](https://facebook.github.io/react/) A Javascript library for building user interfaces.
- [Redux](http://redux.js.org/) A predictable state container for JavaScript apps.
## Installation and Setup
---
- Navigate to directory of choice on terminal.
- Clone this repository on that directory.
   - Using SSH;
     > git clone git@github.com:Andela-opikuda/Document-management-system.git
   - Using HTTP;
     > https://github.com/Andela-opikuda/Document-management-system.git
- Navigate  to the repo's folder on your computer.
     > cd document-management-system/
- Ensure you have [Node.js](https://nodejs.org/en/) installed.
- Install the app's dependencies using npm.
 
     > npm install
- Run tests in your terminal.
     > npm test
- Start the application.
     > npm start
- This launches the app on your default browser on http://localhost:8000

### Installation
---

- Clone the project repository.
- Run git clone https://github.com/andela-opikuda/documentManagementSystem.git.
- Change directory into the documentManagementSystem directory.
- Run npm install to install the dependencies.
- Use Postman or any API testing tool of your choice to access the endpoints.

## Usage
- Run DB migrate commmand with `npm run mig:dev`.
- Run DB seeder command with `npm run seed:dev` to seed initial data into your DB.
- Start the app with `npm start`
- Login, Sign Up and start creating Documents once the app opens up on the browser

## Endpoints
Here's the collection of routes. They can be checked out on Postman
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/89b63da4a2a0c98485e7)
- [Open API Documentation](https://pk-dms.herokuapp.com/docs)

#### Users
EndPoint                      |   Functionality
------------------------------|------------------------
GET /api/user/               |   Gets all users (Admin Only).
POST /api/user/              |   Creates a new user.
GET /api/user/profile         | Gets current users details
GET /api/user/admin         | Get all admin users (Admin Only)
GET /api/user/role?role=${role} | Gets all users in specified role
GET /api/user/:id           |   Finds user by id.
PUT /api/user/:id           |   Updates a user details by id
DELETE /api/user/:id        |   Deletes user
GET /api/search/user?query=${query}        | Get all users with firstname or lastname containing the search query
POST /api/user/login         |   Logs in a user.
POST /api/user/logout        |   Logs out a user.




#### Documents
EndPoint                      |   Functionality
------------------------------|------------------------
POST /api/document/          |   Creates a new document instance.
GET /api/document/           |   Gets all documents.
GET /api/document/:id       |   Find document by id.
PUT /api/document/:id       |   Updates a document attributes.
DELETE /api/document/:id    |   Delete document.
GET search/api/document/?query=${query} | Get all documents with title or content containing the search query

#### Roles
EndPoint                      |   Functionality
------------------------------|------------------------
GET /roles/               |   Get all Roles.
POST /roles/               |   Create a Role.


- It should be noted that some endpoints only available to the Admin.

## How to run tests
---
- In your terminal, run 
   > npm test

#### Contributing
---

1. Fork this repositry to your account.
2. Clone your repositry: git clone https://github.com/andela-opikuda/documentManagementSystem.git
3. Create your feature branch: git checkout -b {feature_name}
4. Commit your changes: git commit -m "commit message"
5. Push to the remote branch: git push origin {feature_name}
6. Open a pull request to the developmen branch.
#### Licence
MIT

Copyright (c) 2017 Pikuda Paul Oluwadamisi