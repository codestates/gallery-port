import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';

import Landing from './pages/Landing';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Mypage from './pages/Mypage';
import Profile from './pages/Profile';
import Project from './pages/Project';
import Loading from './pages/Loading';
import ErrorPage from './pages/Error';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/mypage" component={Mypage} />
          <Route path="/profile" component={Profile} />
          <Route path="/project" component={Project} />
          <Route path="/loading" component={Loading} />
          <Route path="/error" component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
