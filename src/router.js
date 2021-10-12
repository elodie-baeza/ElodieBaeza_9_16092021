import Dashboard from 'pages/dashboard/Dashboard';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

/**
 * @class Allows to switch users with url endpoint user/12 and user/18
 * @returns User dashboard
 */

class Router extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path={'/'}>
                    <Dashboard />
                </Route>

                <Route
                    exact path={'/user/:id'}
                    component={({match}) =>
                    <Dashboard match={match}/>
                }>
                </Route>
            </Switch>
        )
    }
  }
  
  export default Router;  
