import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Landing from './pages/Landing';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Mypage from './pages/Mypage';
import Profile from './pages/Profile';
import Project from './pages/Project';
import Upload from './pages/Upload';
import UploadEdit from './pages/UploadEdit';
import Loading from './pages/Loading';
import ErrorPage from './pages/Error';

// const END_POINT = 'https://gallery-port-server.com';
const END_POINT = process.env.REACT_APP_API_URL;

function App() {
  const [hasUserId, setHasUserId] = useState(undefined);
  const [projectId, setProjectId] = useState('');
  const [stackProjectData, setStackProjectData] = useState('');

  useEffect(() => {
    if (hasUserId !== '') {
      console.log('app.js확인중 - hasUserId :', hasUserId);
      console.log('app.js확인중 - projectId : ', projectId);
    }
  });

  useEffect(() => {
    const getAllData = () => {
      return axios
        .get(`${END_POINT}`, { withCredentials: true })
        .then((res) => {
          const projects = res.data.data.projects;
          setStackProjectData(projects);
        });
    };

    getAllData();
  }, []);

  useEffect(() => {
    const storageSavedUserId = window.localStorage.getItem('userId') || undefined;
    setHasUserId(storageSavedUserId);
  });

  const loginHandler = userId => {
    setHasUserId(userId);
  };

  const logoutHandler = () => {
    window.localStorage.removeItem('userId');
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Landing
              logoutHandler={logoutHandler}
              hasUserId={hasUserId}
              setProjectId={setProjectId}
              setStackProjectData={setStackProjectData}
              stackProjectData={stackProjectData}
            />
          </Route>
          <Route path="/signin">
            <Signin
              loginHandler={loginHandler}
              setHasUserId={setHasUserId}
              hasUserId={hasUserId}
              setStackProjectData={setStackProjectData}
            />
          </Route>
          <Route path="/signup" setStackProjectData={setStackProjectData}>
            <Signup />
          </Route>
          <Route path="/mypage">
            <Mypage
              logoutHandler={logoutHandler}
              hasUserId={hasUserId}
              setStackProjectData={setStackProjectData}
            />
          </Route>
          <Route path="/profile">
            <Profile
              logoutHandler={logoutHandler}
              hasUserId={hasUserId}
              setStackProjectData={setStackProjectData}
              setProjectId={setProjectId}
            />
          </Route>
          <Route path="/project">
            <Project
              logoutHandler={logoutHandler}
              hasUserId={hasUserId}
              setStackProjectData={setStackProjectData}
            />
          </Route>
          <Route path="/uploadedit">
            <UploadEdit logoutHandler={logoutHandler} hasUserId={hasUserId} projectId={projectId}/>
          </Route>
          <Route path="/upload">
            <Upload
              logoutHandler={logoutHandler}
              hasUserId={hasUserId}
              setStackProjectData={setStackProjectData}
            />
          </Route>
          <Route path="/loading">
            <Loading
              logoutHandler={logoutHandler}
              hasUserId={hasUserId}
              setStackProjectData={setStackProjectData}
            />
          </Route>
          <Route path="/error">
            <ErrorPage
              logoutHandler={logoutHandler}
              hasUserId={hasUserId}
              setStackProjectData={setStackProjectData}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
