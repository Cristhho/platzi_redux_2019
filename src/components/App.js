import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Menu from './Menu';
import Users from './users';
import Posts from './posts';

const Tareas = () => <div>Tareas</div>

const App = () => {
  return(
    <BrowserRouter>
      <Menu />
      <div className="margen">
        <Switch>      	
	        <Route exact path="/" component={Users} />
	        <Route exact path="/tasks" component={Tareas} />
          <Route exact path="/posts/:id" component={Posts} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
