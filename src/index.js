import React from 'react'; 
import ReactDOM from 'react-dom/client';  
import { keycloakService } from './keycloakService';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

keycloakService.initialize().then(() => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
});