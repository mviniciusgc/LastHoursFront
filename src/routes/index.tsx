import React from 'react';
import { Switch } from 'react-router-dom';
import SignIn from '../pages/signin';
import SignUp from '../pages/signUp';
import Dashboard from '../pages/dashboard';
import Route from './Route';


const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} isPrivate/>
    </Switch>

);

export default Routes;