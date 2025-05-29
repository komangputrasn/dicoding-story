import AuthPresenter from "../presenters/auth-presenter.js";

class RegisterPage {
  constructor(container) {
    this._container = container;
    this._presenter = new AuthPresenter(this);
  }

  async render() {
    this._container.innerHTML = `
      <section class="page form-container" role="region" aria-labelledby="register-title">
        <h2 id="register-title">Register</h2>
        <div id="alert-container" role="alert" aria-live="assertive"></div>
        <form id="register-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password (min 8 characters)</label>
            <input type="password" id="password" name="password" minlength="8" required>
          </div>
          <button type="submit" id="submit-button">Register</button>
        </form>
        <p>Already have an account? <a href="#/login">Login here</a></p>
      </section>
    `;

    this._initRegisterForm();
  }

  _initRegisterForm() {
    const form = document.getElementById("register-form");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        await this._presenter.register(name, email, password);

        setTimeout(() => {
          window.location.hash = "#/login";
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    });
  }

  showLoading() {
    const button = document.getElementById("submit-button");
    button.textContent = "Registering...";
    button.disabled = true;
  }

  hideLoading() {
    const button = document.getElementById("submit-button");
    button.textContent = "Register";
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

export default RegisterPage;
