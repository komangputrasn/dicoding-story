
class AuthService {
  constructor() {
    this._storageKey = "dicodingStoryAuth";
  }


  setAuth(data) {
    localStorage.setItem(this._storageKey, JSON.stringify(data));
  }


  getAuth() {
    const data = localStorage.getItem(this._storageKey);
    return data ? JSON.parse(data) : null;
  }


  isLoggedIn() {
    return !!this.getAuth();
  }


  getToken() {
    const auth = this.getAuth();
    return auth ? auth.token : null;
  }


  getUserName() {
    const auth = this.getAuth();
    return auth ? auth.name : null;
  }


  logout() {
    localStorage.removeItem(this._storageKey);
  }
}

export default AuthService;
