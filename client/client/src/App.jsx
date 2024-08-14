import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/auth/Register";
<<<<<<< HEAD
import Chat from "./pages/Chat/Chat";




=======
import Services from "./pages/services/Services";
import SingleService from "./pages/services/SingleService";
>>>>>>> 215d02da4246eb3921df9bd5b3f8f1f3a7521c25

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
<<<<<<< HEAD
          <Route path="/chat" element={<Chat/>}/>
=======
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<SingleService />} />
>>>>>>> 215d02da4246eb3921df9bd5b3f8f1f3a7521c25
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
