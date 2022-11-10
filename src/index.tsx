import React from 'react';
import ReactDOM from 'react-dom/client';

import './scss/global.scss';

import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

console.log('check');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
