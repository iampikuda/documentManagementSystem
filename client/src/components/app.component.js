import React, { Component } from 'react';
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Index from './index.component';

import loginPage from './containers/loginPage.jsx';
import signUpPage from './containers/signUpPage.jsx';

class App extends Component{
    render(){
        return (
            <BrowserRouter>
              <switch>
                <Route exact path='/login' component={loginPage} />
                <Route exact path='/app' component={Index} />
                <Route exact path='/' component={signUpPage} />
              </switch>
            </BrowserRouter>
        );
    }
}
export default App;