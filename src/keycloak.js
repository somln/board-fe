import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8180',
    realm: 'board',
    clientId: 'main_client' 
});

const initializeKeycloak = async () => {
    try {
        const authenticated = await keycloak.init({ onLoad: 'login-required' }); //로그인 필수
        console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
        if (!authenticated) {
            keycloak.login(); // 인증되지 않았을 경우 로그인 페이지로 리다이렉트
        }
    } catch (error) {
        console.error('Failed to initialize Keycloak:', error);
    }
};

const logout = () => {
    keycloak.logout();
};

export { keycloak, initializeKeycloak, logout };
