import Dashboard from 'pages/dashboard/Dashboard';
import React from 'react';
import { Route } from 'react-router-dom';

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
