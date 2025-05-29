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
import FavoritesPage from "./views/favorites-page.js";
import NotFoundPage from "./views/not-found-page.js";

import AuthService from "./services/auth-service.js";
import PushNotificationService from "./services/push-notification-service.js";
import IndexedDBService from "./services/indexeddb-service.js";

const routes = {
  "/": HomePage,
  "/home": HomePage,
  "/add": AddStoryPage,
  "/login": LoginPage,
  "/register": RegisterPage,
  "/detail/:id": DetailPage,
  "/favorites": FavoritesPage,
};

class App {
  constructor() {
    this._content = document.getElementById("main-content");
    this._loginMenu = document.getElementById("loginMenu");
    this._authService = new AuthService();
    this._pushNotificationService = new PushNotificationService();
    this._indexedDBService = new IndexedDBService();

    this._initApp();
  }

  async _initApp() {
    await this._registerServiceWorker();
    await this._initServices();
    this._updateAuthMenu();

    window.addEventListener("hashchange", () => {
      this._renderPage();
    });

    this._renderPage();
  }
  async _registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register(
          new URL("./sw.js", import.meta.url)
        );
        console.log("Service Worker registered successfully:", registration);

        // Handle service worker updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // New service worker available
              this._showUpdateNotification();
            }
          });
        });
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    }
  }
  async _initServices() {
    try {
      // Initialize IndexedDB
      await this._indexedDBService.init();

      // Initialize push notifications if user is logged in
      if (this._authService.isLoggedIn()) {
        await this._pushNotificationService.init();
      }

      // Setup install prompt
      this._setupInstallPrompt();

      // Setup offline/online detection
      this._setupOfflineDetection();
    } catch (error) {
      console.error("Failed to initialize services:", error);
    }
  }

  _setupInstallPrompt() {
    let deferredPrompt;

    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      deferredPrompt = e;
      // Show install button
      this._showInstallPrompt(deferredPrompt);
    });

    window.addEventListener("appinstalled", () => {
      console.log("PWA was installed");
      this._hideInstallPrompt();
    });
  }

  _showInstallPrompt(deferredPrompt) {
    const installPrompt = document.createElement("div");
    installPrompt.className = "install-prompt";
    installPrompt.id = "install-prompt";
    installPrompt.innerHTML = `
      <p>📱 Install Dicoding Story App for a better experience!</p>
      <button id="install-app">Install</button>
      <button id="dismiss-install">Later</button>
    `;

    document.body.appendChild(installPrompt);

    document
      .getElementById("install-app")
      .addEventListener("click", async () => {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        // Clear the deferred prompt variable
        deferredPrompt = null;
        this._hideInstallPrompt();
      });

    document.getElementById("dismiss-install").addEventListener("click", () => {
      this._hideInstallPrompt();
    });
  }

  _hideInstallPrompt() {
    const installPrompt = document.getElementById("install-prompt");
    if (installPrompt) {
      installPrompt.remove();
    }
  }

  _setupOfflineDetection() {
    const showOfflineIndicator = () => {
      if (!document.getElementById("offline-indicator")) {
        const indicator = document.createElement("div");
        indicator.id = "offline-indicator";
        indicator.className = "offline-indicator";
        indicator.textContent =
          "📶 You are offline. Some features may be limited.";
        document.body.appendChild(indicator);
      }
    };

    const hideOfflineIndicator = () => {
      const indicator = document.getElementById("offline-indicator");
      if (indicator) {
        indicator.remove();
      }
    };

    window.addEventListener("online", hideOfflineIndicator);
    window.addEventListener("offline", showOfflineIndicator);

    // Check initial state
    if (!navigator.onLine) {
      showOfflineIndicator();
    }
  }

  _showUpdateNotification() {
    // Show a notification that the app has been updated
    const updateBanner = document.createElement("div");
    updateBanner.className = "update-banner";
    updateBanner.innerHTML = `
      <div class="alert alert-info">
        <p>A new version is available! 
        <button id="refresh-app">Refresh to update</button>
        <button id="dismiss-update">Dismiss</button></p>
      </div>
    `;

    document.body.insertBefore(updateBanner, document.body.firstChild);

    document.getElementById("refresh-app").addEventListener("click", () => {
      window.location.reload();
    });

    document.getElementById("dismiss-update").addEventListener("click", () => {
      updateBanner.remove();
    });
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

    // Return 404 page if no route matches
    return page || NotFoundPage;
  }

  _routeRequiresAuth(resource) {
    return ["/add"].includes(resource);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App();
});
