import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Menu from './Menu';
import Users from './users';

const Tareas = () => <div>Tareas</div>

const App = () => {
  return(
    <BrowserRouter>
      <Menu />
      <div className="margen">
        <Switch>      	
	        <Route exact path="/" component={Users} />
	        <Route exact path="/tareas" component={Tareas} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
