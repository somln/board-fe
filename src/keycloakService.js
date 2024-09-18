import Keycloak from 'keycloak-js';

class KeycloakService {
  
  constructor(config) {
    this.keycloak = new Keycloak(config);
  }

  async initialize() {
    try {
      // Keycloak을 초기화하고, SSO를 체크함. 사용자 인증 여부를 반환
      const authenticated = await this.keycloak.init({ onLoad: 'check-sso' });  
      console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
      
      if (authenticated) {  // 인증된 경우, 토큰을 sessionStorage에 저장
        sessionStorage.setItem('token', this.keycloak.token); 
      }
      return authenticated;
    } catch (error) {
      console.error('Failed to initialize Keycloak:', error);
    }
  }

 login() {
    this.keycloak.login();
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  logout() {
    this.keycloak.logout();
    sessionStorage.removeItem('token');
  }

  isLoggedIn = () => this.keycloak.token;

  updateToken = async (successCallback) => {
    try {
      if (this.keycloak.isTokenExpired(5)) { // 토큰 만료 여부 확인
        await this.keycloak.updateToken(5);
        sessionStorage.setItem('token', this.keycloak.token); // 새로 갱신된 토큰 저장
        successCallback(); // 갱신 성공 시 콜백 함수 호출
      } else {
        successCallback(); // 토큰이 유효한 경우 그대로 콜백 함수 호출
      }
    } catch (error) {
      console.error('Token update failed, logging in again:', error);
      this.login(); // 갱신 실패 시 다시 로그인
    }
  };
}

const keycloakConfig = {
  url: process.env.REACT_APP_KEYCLOAK_URL, 
  realm: process.env.REACT_APP_KEYCLOAK_REALM, 
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID 
};

const keycloakService = new KeycloakService(keycloakConfig);

export { keycloakService }