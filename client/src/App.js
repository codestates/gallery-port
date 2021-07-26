import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Mypage from './pages/Mypage';
import Profile from './pages/Profile';
import Project from './pages/Project';
import Upload from './pages/Upload';
import Loading from './pages/Loading';
import ErrorPage from './pages/Error';

function App() {
  const [hasUserId, setHasUserId] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  // const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (hasUserId !== '') {
      console.log('1111', hasUserId);
      console.log('들어왔습니다.');
      console.log('888', hasUserId, isLogin);
      // loginHandler(hasUserId);
    }
  });

  console.log('999', hasUserId, isLogin);

  const loginHandler = (userId) => {
    setIsLogin(true);
    setHasUserId(userId);
  };

  const logoutHandler = () => {
    setIsLogin(false);
    setHasUserId('');
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Landing logoutHandler={logoutHandler} hasUserId={hasUserId} />
          </Route>
          {isLogin ? (
            <Landing logoutHandler={logoutHandler} hasUserId={hasUserId} />
          ) : (
            <Route path="/signin">
              <Signin loginHandler={loginHandler} />
            </Route>
          )}
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/mypage">
            <Mypage logoutHandler={logoutHandler} hasUserId={hasUserId} />
          </Route>
          <Route path="/profile">
            <Profile logoutHandler={logoutHandler} hasUserId={hasUserId} />
          </Route>
          <Route path="/project">
            <Project logoutHandler={logoutHandler} />
          </Route>
          <Route path="/upload">
            <Upload logoutHandler={logoutHandler} />
          </Route>
          <Route path="/loading">
            <Loading logoutHandler={logoutHandler} />
          </Route>
          <Route path="/error">
            <ErrorPage logoutHandler={logoutHandler} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
