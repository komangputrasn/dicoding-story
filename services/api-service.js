import AuthService from "./auth-service.js";

class ApiService {
  constructor() {
    this._baseUrl = "https://story-api.dicoding.dev/v1";
    this._authService = new AuthService();
  }

  _getAuthHeader() {
    const token = this._authService.getToken();
    console.log("Auth token: " + token);
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async register(name, email, password) {
    try {
      const response = await fetch(`${this._baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        throw new Error(responseJson.message);
      }

      return responseJson;
    } catch (error) {
      throw new Error(`Register failed: ${error.message}`);
    }
  }

  async login(email, password) {
    try {
      const response = await fetch(`${this._baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        throw new Error(responseJson.message);
      }

      this._authService.setAuth({
        token: responseJson.loginResult.token,
        name: responseJson.loginResult.name,
        userId: responseJson.loginResult.userId,
      });

      return responseJson;
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  async getStories(page = 1, size = 10, location = 1) {
    try {
      const url = new URL(`${this._baseUrl}/stories`);
      url.searchParams.append("page", page);
      url.searchParams.append("size", size);
      url.searchParams.append("location", location);

      const response = await fetch(url, {
        headers: this._getAuthHeader(),
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        throw new Error(responseJson.message);
      }

      return responseJson.listStory;
    } catch (error) {
      if (!this._authService.isLoggedIn()) {
        return this._getStoriesAsGuest();
      }

      throw new Error(`Failed to get stories: ${error.message}`);
    }
  }

  async _getStoriesAsGuest() {
    try {
      return [];
    } catch (error) {
      throw new Error(`Failed to get stories as guest: ${error.message}`);
    }
  }

  async getStoryDetail(id) {
    try {
      const response = await fetch(`${this._baseUrl}/stories/${id}`, {
        headers: this._getAuthHeader(),
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        throw new Error(responseJson.message);
      }

      return responseJson.story;
    } catch (error) {
      throw new Error(`Failed to get story detail: ${error.message}`);
    }
  }

  async addStory(description, photoBlob, lat, lon) {
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("photo", photoBlob);

      if (lat && lon) {
        formData.append("lat", lat);
        formData.append("lon", lon);
      }

      const endpoint = this._authService.isLoggedIn()
        ? `${this._baseUrl}/stories`
        : `${this._baseUrl}/stories/guest`;

      const headers = this._authService.isLoggedIn()
        ? this._getAuthHeader()
        : {};

      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: formData,
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        throw new Error(responseJson.message);
      }

      return responseJson;
    } catch (error) {
      throw new Error(`Failed to add story: ${error.message}`);
    }
  }
}

export default ApiService;
