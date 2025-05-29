import ApiService from "../services/api-service.js";
import AuthService from "../services/auth-service.js";

class AuthModel {
  constructor() {
    this._apiService = new ApiService();
    this._authService = new AuthService();
  }

  async login(email, password) {
    const result = await this._apiService.login(email, password);
    return result;
  }

  async register(name, email, password) {
    const result = await this._apiService.register(name, email, password);
    return result;
  }

  isLoggedIn() {
    return this._authService.isLoggedIn();
  }

  logout() {
    this._authService.logout();
  }
}

export default AuthModel;
