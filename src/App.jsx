import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import CursorAnimation from './components/CursorAnimation/CursorAnimation';
import ImageGenerator from './components/ImageGenerator/ImageGenerator';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Sidebar />
            <Main />
          </>
        } />
        <Route path="/image-generator" element={<ImageGenerator />} />
      </Routes>
      <CursorAnimation />
    </Router>
  );
};

export default App;
