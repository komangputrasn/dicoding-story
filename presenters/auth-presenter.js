import BasePresenter from "./base-presenter.js";
import AuthModel from "../models/auth-model.js"; // Impor AuthModel

class AuthPresenter extends BasePresenter {
  constructor(view) {
    super(view);
    this._authModel = new AuthModel(); // Gunakan AuthModel
  }

  async login(email, password) {
    try {
      this._view.showLoading();
      // Panggil metode login dari AuthModel
      const result = await this._authModel.login(email, password);
      this._view.showSuccess("Login successful. Redirecting to home page...");
      return result;
    } catch (error) {
      this._view.showError(error.message);
      throw error;
    } finally {
      this._view.hideLoading();
    }
  }

  async register(name, email, password) {
    try {
      this._view.showLoading();
      // Panggil metode register dari AuthModel
      const result = await this._authModel.register(name, email, password);
      this._view.showSuccess(
        "Registration successful. Please login with your new account."
      );
      return result;
    } catch (error) {
      this._view.showError(error.message);
      throw error;
    } finally {
      this._view.hideLoading();
    }
  }

  isLoggedIn() {
    return this._authModel.isLoggedIn(); // Gunakan AuthModel
  }

  logout() {
    this._authModel.logout(); // Gunakan AuthModel
  }
}

export default AuthPresenter;
