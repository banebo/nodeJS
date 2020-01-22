import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './pages/Header'
import Home from './pages/Home'
import Documents from './pages/Documents'
import Preview from './pages/Preview'
import Edit from './pages/Edit'
import PageNotFound from './pages/PageNotFound'
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/documents' component={Documents} />
          <Route exact path='/documents/:id' render={({match}) => <Preview id={match.params.id} />} />
          <Route exact path='/documents/edit/:id' render={({match}) => <Edit id={match.params.id} />} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
