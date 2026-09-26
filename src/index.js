import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// old-style anchors (#projects) predate the router owning the hash — upgrade them to #/projects
if (/^#[a-z][\w-]*$/i.test(window.location.hash)) {
  window.history.replaceState(null, '', `#/${window.location.hash.slice(1)}`);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
