import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8180',
    realm: 'board',
    clientId: 'main_client' 
});

const initializeKeycloak = async () => {
    if (!keycloak.authenticated) { 
        try {
            const authenticated = await keycloak.init({ onLoad: 'login-required' });
            console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
            if (!authenticated) {
                keycloak.login();
            }
        } catch (error) {
            console.error('Failed to initialize Keycloak:', error);
        }
    } else {
        console.log('Keycloak is already initialized');
    }
};



const logout = () => {
    keycloak.logout();
};

export { keycloak, initializeKeycloak, logout };
