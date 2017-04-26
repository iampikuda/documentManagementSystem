import React, { Component } from 'react';
import { Route, Router, browserHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom'

import Index from './index.component';
import loginPage from './containers/loginPage.jsx';
import signUpPage from './containers/signUpPage.jsx';
import dashboard from './dashboard/Index.component.jsx';
import NotFound from './notFound.component';

class App extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path='/' component={Index} />
                <Route path='/login' component={loginPage} />
                <Route path='/signup' component={signUpPage} />
                <Route exact path='/dashboard' component={dashboard} />
                <Route path="/*" component={NotFound} />
            </Router>
        );
    }
}
export default App;
