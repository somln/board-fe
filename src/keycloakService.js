import Keycloak from 'keycloak-js';

class KeycloakService {
    
    constructor(config) {
        this.keycloak = new Keycloak(config);
    }

    async initialize() {
        try {
            const authenticated = await this.keycloak.init({ onLoad: 'login-required' });
            console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
            if (authenticated) {
                sessionStorage.setItem('token', this.keycloak.token);
            } else {
                this.keycloak.login();
            }
        } catch (error) {
            console.error('Failed to initialize Keycloak:', error);
        }
    }

    getToken() {
        return sessionStorage.getItem('token'); 
    }

    logout() {
        this.keycloak.logout();
        sessionStorage.removeItem('token');
    }
}

const keycloakConfig = {
    url: 'http://localhost:8180',
    realm: 'board',
    clientId: 'main_client'
};

const keycloakService = new KeycloakService(keycloakConfig);

export { keycloakService };
