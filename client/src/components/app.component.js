import React, { Component } from 'react';
import { Route, Router, browserHistory } from 'react-router';
import Index from './index.component';
import loginPage from './authPages/loginPage.jsx';
import signUpPage from './authPages/signUpPage.jsx';
import dashboard from './dashboard/dashboardCommons/Index.component.jsx';
import NotFound from './commons/notFound.component.js';
// import userPage from './userPages/viewUser.component.jsx';
import ViewUser from './userPages/viewUser.component.jsx';
import EditUser from './userPages/editUser.component.jsx';
import EditUsersRole from './userPages/editUsersRole.component';


/**
 * Router component
 * @class App
 * @extends {Component}
 */
class App extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path='/' component={Index} />
                <Route path='/login' component={loginPage} />
                <Route path='/signup' component={signUpPage} />
                <Route exact path='/dashboard' component={dashboard} />
                
                <Route path='/user' component={EditUser} />
                <Route path='/user/role-edit' component={EditUsersRole} />

                <Route path="/*" component={NotFound} />
            </Router>
        );
    }
}
export default App;
