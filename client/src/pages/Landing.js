import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import LandingGallery from '../components/Landing/LandingGallery';
import LandingProjects from '../components/Landing/LandingProjects';

function Landing() {
  const [mainTitle, setMainTitle] = useState('nothings');

  useEffect(() => {
    getTitle();
  });

  async function getTitle() {
    const response = await axios.get("https://gallery-port-server.com/");
    if (response.data.landing !== '')
      return setMainTitle(response.data.landing);
    return mainTitle;
  }

  return (
    <div style={{ overflowX: 'hidden' }}>
      <LandingGallery mainTitle={mainTitle} />
      <Header />
      <LandingProjects />
      <Footer />
    </div>
  );
}

export default Landing;
