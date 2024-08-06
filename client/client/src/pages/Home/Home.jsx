import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return <Navbar />;
}

export default Home;
