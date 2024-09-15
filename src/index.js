import React from 'react';
import ReactDOM from 'react-dom/client';
import { keycloakService } from './keycloakService';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

keycloakService.initialize().then((authenticated) => {
  root.render(
    <React.StrictMode>
      <App authenticated={authenticated} />
    </React.StrictMode>
  );
});

