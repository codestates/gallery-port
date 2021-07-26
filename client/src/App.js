import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

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
  const [hasUserId, setHasUserId] = useState(undefined);
  // const [isLogin, setIsLogin] = useState(false);
  // const [userData, setUserData] = useState(null);
  let history = useHistory();

  useEffect(() => {
    if (hasUserId !== '') {
      console.log('1111', hasUserId);
      console.log('들어왔습니다.');
      console.log('888', hasUserId);
      // loginHandler(hasUserId);
    }
  });

  console.log('999', hasUserId);

  const loginHandler = (userId) => {
    setHasUserId(userId);
  };

  const logoutHandler = () => {
    setHasUserId(undefined);
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Landing logoutHandler={logoutHandler} hasUserId={hasUserId} />
          </Route>
          <Route path="/signin">
            <Signin
              loginHandler={loginHandler}
              setHasUserId={setHasUserId}
              hasUserId={hasUserId}
            />
          </Route>
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
            <Project logoutHandler={logoutHandler} hasUserId={hasUserId} />
          </Route>
          <Route path="/upload">
            <Upload logoutHandler={logoutHandler} hasUserId={hasUserId} />
          </Route>
          <Route path="/loading">
            <Loading logoutHandler={logoutHandler} hasUserId={hasUserId} />
          </Route>
          <Route path="/error">
            <ErrorPage logoutHandler={logoutHandler} hasUserId={hasUserId} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
