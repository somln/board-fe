import React, { useEffect } from 'react';
import { initializeKeycloak } from './keycloak';  
import PrivateRoute from './PrivateRoute';
import { ReactKeycloakProvider } from '@react-keycloak/web';

function App() {
  useEffect(() => {
    initializeKeycloak(); 
  }, []);

  return (
      <div className="App">
          <h1>Welcome to the App</h1>
      </div>
  );
}

export default App;
