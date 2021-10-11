import Dashboard from 'pages/dashboard/Dashboard';
import React from 'react';
import { Route } from 'react-router-dom';

/**
 * @class
 * Allows you to switch users with url endpoint
 * only user/12 and user/18 are available
 */

class Router extends React.Component {

    render() {
        return (
            <Route
                exact path={'/user/:id'}
                component={({match}) =>
                <Dashboard match={match}/>
                }>
            </Route>
        )
    }
  }
  
  export default Router;  
