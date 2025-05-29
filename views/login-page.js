import AuthPresenter from "../presenters/auth-presenter.js";

class LoginPage {
  constructor(container) {
    this._container = container;
    this._presenter = new AuthPresenter(this);
  }

  async render() {
    this._container.innerHTML = `
      <section class="page form-container" role="region" aria-labelledby="login-title">
        <h2 id="login-title">Login</h2>
        <div id="alert-container" role="alert" aria-live="assertive"></div>
        <form id="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>
          </div>
          <button type="submit" id="submit-button">Login</button>
        </form>
        <p>Don't have an account? <a href="#/register">Register here</a></p>
      </section>
    `;

    this._initLoginForm();
  }

  _initLoginForm() {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        await this._presenter.login(email, password);

        setTimeout(() => {
          window.location.hash = "#/home";
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    });
  }

  showLoading() {
    const button = document.getElementById("submit-button");
    button.textContent = "Logging in...";
    button.disabled = true;
  }

  hideLoading() {
    const button = document.getElementById("submit-button");
    button.textContent = "Login";
    button.disabled = false;
  }

  showError(message) {
    const alertContainer = document.getElementById("alert-container");
    alertContainer.innerHTML = `
      <div class="alert alert-danger">
        ${message}
      </div>
    `;
  }

  showSuccess(message) {
    const alertContainer = document.getElementById("alert-container");
    alertContainer.innerHTML = `
      <div class="alert alert-success">
        ${message}
      </div>
    `;
  }
}

export default LoginPage;
