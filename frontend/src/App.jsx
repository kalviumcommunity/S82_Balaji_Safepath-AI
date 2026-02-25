import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

// Direct imports for now
import Home from './pages/Home';
import Chat from './pages/Chat';
import Checklist from './pages/Checklist';
import RiskMap from './pages/RiskMap';
import Community from './pages/Community';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      {/* Container for Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="chat" element={<Chat />} />
          <Route path="checklist" element={<Checklist />} />
          <Route path="map" element={<RiskMap />} />
          <Route path="community" element={<Community />} />
        </Route>

        {/* Auth routes outside of MainLayout if desired, or inside. We'll put them inside MainLayout for easy navigation for now */}
        <Route path="/" element={<MainLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
