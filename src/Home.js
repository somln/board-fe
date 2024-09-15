import React from 'react';
import { keycloakService } from './keycloakService';

function Home() {
  return (
    <div>
      <h1>Welcome to our App</h1>
      <button onClick={() => keycloakService.login()}>Login</button>
      <button onClick={() => keycloakService.register()}>Register</button>
    </div>
  );
}

export default Home;