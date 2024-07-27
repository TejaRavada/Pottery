import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ScrollProvider } from './Context/MyContext';
import { CatScrollProvider } from './Context/CatScroll';
import { ReviewProvider } from './Context/ReviewContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ScrollProvider>
        <CatScrollProvider>
          <ReviewProvider>
            <App />
          </ReviewProvider>
        </CatScrollProvider>
      </ScrollProvider>
    </Router>
  </React.StrictMode>
);
