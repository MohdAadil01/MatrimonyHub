import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfilePortal from './Navbar/ProfilePoertal';
import Navbar from './Navbar/Navbar';

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
   <Navbar />
  )
}

export default Home