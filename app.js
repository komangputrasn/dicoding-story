const API_BASE_URL = "https://story-api.dicoding.dev/v1";

const API_ENDPOINTS = {
  register: `${API_BASE_URL}/register`,
  login: `${API_BASE_URL}/login`,
  stories: `${API_BASE_URL}/stories`,
  guestStories: `${API_BASE_URL}/stories/guest`,
  detailStory: (id) => `${API_BASE_URL}/stories/${id}`,
  subscribe: `${API_BASE_URL}/notifications/subscribe`,
  unsubscribe: `${API_BASE_URL}/notifications/subscribe`,
};

import HomePage from "./views/home-page.js";
import AddStoryPage from "./views/add-story-page.js";
import LoginPage from "./views/login-page.js";
import RegisterPage from "./views/register-page.js";
import DetailPage from "./views/detail-page.js";

import AuthService from "./services/auth-service.js";

const routes = {
  "/": HomePage,
  "/home": HomePage,
  "/add": AddStoryPage,
  "/login": LoginPage,
  "/register": RegisterPage,
  "/detail/:id": DetailPage,
};

class App {
  constructor() {
    this._content = document.getElementById("main-content");
    this._loginMenu = document.getElementById("loginMenu");
    this._authService = new AuthService();

    this._initApp();
  }

  async _initApp() {
    this._updateAuthMenu();

    window.addEventListener("hashchange", () => {
      this._renderPage();
    });

    this._renderPage();
  }

  _updateAuthMenu() {
    const isLoggedIn = this._authService.isLoggedIn();
    const username = this._authService.getUserName();

    if (isLoggedIn) {
      this._loginMenu.textContent = `Logout (${username || "User"})`;
      this._loginMenu.href = "#/home";
      this._loginMenu.setAttribute("aria-label", "Logout from your account");

      const oldClone = this._loginMenu.cloneNode(true);
      this._loginMenu.parentNode.replaceChild(oldClone, this._loginMenu);
      this._loginMenu = oldClone;

      this._loginMenu.addEventListener("click", (e) => {
        e.preventDefault();
        this._authService.logout();
        this._updateAuthMenu();
        window.location.hash = "#/home";
      });
    } else {
      this._loginMenu.textContent = "Login";
      this._loginMenu.href = "#/login";
      this._loginMenu.setAttribute("aria-label", "Go to login page");

      const oldClone = this._loginMenu.cloneNode(true);
      this._loginMenu.parentNode.replaceChild(oldClone, this._loginMenu);
      this._loginMenu = oldClone;
    }
  }

  async _renderPage() {
    if (document.startViewTransition) {
      document.startViewTransition(() => this._updateDOM());
    } else {
      this._updateDOM();
    }
  }

  async _updateDOM() {
    const hash = window.location.hash.slice(1).toLowerCase() || "/";
    const url = this._parseActiveUrl(hash);
    const page = this._getPage(url);

    try {
      this._content.innerHTML = "";

      if (
        this._routeRequiresAuth(url.resource) &&
        !this._authService.isLoggedIn()
      ) {
        window.location.hash = "#/login";
        return;
      }

      const view = new page(this._content, url.id);
      await view.render();

      this._updateAuthMenu();

      this._content.focus();
    } catch (error) {
      console.error("Error rendering page:", error);
      this._showErrorPage(error);
    }
  }

  _showErrorPage(error) {
    this._content.innerHTML = `
      <section class="page error-page" role="alert">
        <h2>Oops! Something went wrong</h2>
        <p>${error.message || "Unknown error occurred"}</p>
        <a href="#/home" class="btn">Back to Home</a>
      </section>
    `;
  }

  _parseActiveUrl(url) {
    const splitedUrl = url.split("/");
    return {
      resource: `/${splitedUrl[1] || ""}`,
      id: splitedUrl[2] || null,
    };
  }

  _getPage(url) {
    let page;

    if (url.id) {
      const idParameterRoute = Object.keys(routes).find((route) =>
        route.includes("/:id")
      );

      if (idParameterRoute) {
        const baseRoute = idParameterRoute.replace("/:id", "");
        if (url.resource === baseRoute) {
          page = routes[idParameterRoute];
        }
      }
    } else {
      page = routes[url.resource];
    }

    return page || routes["/"];
  }

  _routeRequiresAuth(resource) {
    return ["/add"].includes(resource);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App();
});
