import React, { useState } from 'react';
import { keycloakService } from './keycloakService';
import SignUp from './SignUp';

function Home() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div>
      <h1>Welcome to our App</h1>
      {!showSignUp ? (
        <>
          <button onClick={() => keycloakService.login()}>Login</button>
          <button onClick={() => setShowSignUp(true)}>Register</button>
        </>
      ) : (
        <SignUp onCancel={() => setShowSignUp(false)} />
      )}
    </div>
  );
}

export default Home;
