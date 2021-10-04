import React from 'react';
import { Switch, Route } from 'react-router';
import { Home, AudioClientPage } from './pages';

const AppRouter = () =>
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/audio" component={AudioClientPage}/>
  </Switch>;

export { AppRouter };
