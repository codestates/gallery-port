import React, { useEffect, useState } from 'react';
import './App.css';
import Gallery from './pages/Gallery';
import axios from 'axios';

function App() {
  const [mainTitle, setMainTitle] = useState('nothing');

  useEffect(() => {
    getTitle();
  });

  async function getTitle() {
    const response = await axios.get('http://3.36.96.62/');
    if (response.data.landing !== '')
      return setMainTitle(response.data.landing);
    return mainTitle;
  }

  return (
    <div className="App">
      {/* we are making the best application in the world! - gallery:port */}
      <Gallery mainTitle={mainTitle} />
    </div>
  );
}

export default App;
