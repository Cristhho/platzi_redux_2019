import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Menu from './Menu';
import Users from './users';
import Posts from './posts';
import Tasks from './tasks';
import Save from './tasks/Save';

const App = () => {
  return(
    <BrowserRouter>
      <Menu />
      <div className="margen">
        <Switch>      	
	        <Route exact path="/" component={Users} />
	        <Route exact path="/tasks" component={Tasks} />
          <Route exact path="/tasks/save" component={Save} />
          <Route exact path="/posts/:id" component={Posts} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
