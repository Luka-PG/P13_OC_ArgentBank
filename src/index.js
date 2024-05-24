import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from "react-redux";

import store from "./Utils/store.js";

import Header from './Components/Header/Header.js';
import Home from './Pages/Home/Home.js';
import SignIn from './Pages/SignIn/SignIn.js'
import Profil from './Pages/Profil/Profile.js';
import Error from './Pages/Error/Error.js';
import Footer from './Components/Footer/Footer.js';

import "./main.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Profil" element={<Profil />} />
          <Route path="*" element={<Error/>} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  </React.StrictMode>
);