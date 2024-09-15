import Keycloak from 'keycloak-js';

class KeycloakAdapter {
    
    constructor(config) {
        if (!KeycloakAdapter.instance) {
            this.keycloak = new Keycloak(config);
            KeycloakAdapter.instance = this;
        }
        return KeycloakAdapter.instance;
    }

    async initialize() {
        try {
            const authenticated = await this.keycloak.init({ onLoad: 'login-required' });
            console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`); // 백틱(`) 사용
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
        return sessionStorage.getItem('token'); // 이 부분에서 오타 수정
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

const keycloakAdapter = new KeycloakAdapter(keycloakConfig);

export { keycloakAdapter };
