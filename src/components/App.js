import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Menu from './Menu';
import Users from '../users/index';

const Tareas = () => <div>Tareas</div>

const App = () => {
  return(
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route exact path="/" component={Users} />
        <Route exact path="/tareas" component={Tareas} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
