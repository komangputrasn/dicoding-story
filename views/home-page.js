import StoryPresenter from "../presenters/story-presenter.js";
import IndexedDBService from "../services/indexeddb-service.js";

class HomePage {
  constructor(container) {
    this._container = container;
    this._presenter = new StoryPresenter(this);
    this._indexedDBService = new IndexedDBService();
    this._stories = [];
    this._map = null;
  }

  async render() {
    this._container.innerHTML = `
      <section class="page" role="region" aria-labelledby="home-title">
        <h2 id="home-title">Latest Stories</h2>
        <div id="loading" role="status" aria-live="polite">Loading stories...</div>
        <div id="error-container" role="alert" aria-live="assertive" style="display:none;"></div>
        <div id="map" aria-label="Map showing story locations"></div>
        <div id="story-list" class="story-list"></div>
      </section>
    `;

    await this._initIndexedDB();
    await this._fetchStories();
    this._initMap();
    this._renderStories();
  }

  async _initIndexedDB() {
    try {
      await this._indexedDBService.init();
    } catch (error) {
      console.error("Failed to initialize IndexedDB:", error);
    }
  }

  async _fetchStories() {
    this._stories = await this._presenter.getStories(1, 10, 1);
  }

  async _renderStories() {
    const storyListElement = document.getElementById("story-list");
    const loadingElement = document.getElementById("loading");

    loadingElement.style.display = "none";

    if (this._stories.length === 0) {
      storyListElement.innerHTML =
        "<p>No stories found. Please login to see stories or add new ones.</p>";
      return;
    }

    // Cache stories for offline viewing
    for (const story of this._stories) {
      try {
        await this._indexedDBService.cacheStory(story);
      } catch (error) {
        console.error("Failed to cache story:", error);
      }
    }

    storyListElement.innerHTML = await Promise.all(
      this._stories.map(async (story) => {
        const isFavorite = await this._checkIfFavorite(story.id);
        return `
      <article class="story-item">
        <img src="${story.photoUrl}" alt="Photo by ${
          story.name
        }" class="story-img">
        <div class="story-content">
          <h3>${story.name}</h3>
          <p class="story-description">${this._truncateText(
            story.description,
            100
          )}</p>
          <p class="story-date">${this._formatDate(story.createdAt)}</p>
          <div class="story-actions">
            <a href="#/detail/${story.id}" class="story-link">Read more</a>
            <button 
              class="favorite-btn ${isFavorite ? "is-favorite" : ""}" 
              data-story-id="${story.id}"
              aria-label="${
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }"
            >
              ${isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
            </button>
          </div>
        </div>
      </article>
    `;
      })
    ).then((storyHtmlArray) => storyHtmlArray.join(""));

    this._initFavoriteButtons();
  }

  async _checkIfFavorite(storyId) {
    try {
      return await this._indexedDBService.isFavoriteStory(storyId);
    } catch (error) {
      console.error("Failed to check favorite status:", error);
      return false;
    }
  }

  _initFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll(".favorite-btn");

    favoriteButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        const storyId = button.dataset.storyId;
        const isFavorite = button.classList.contains("is-favorite");

        try {
          if (isFavorite) {
            await this._removeFavorite(storyId, button);
          } else {
            await this._addFavorite(storyId, button);
          }
        } catch (error) {
          console.error("Failed to update favorite:", error);
          this.showError("Failed to update favorite status");
        }
      });
    });
  }

  async _addFavorite(storyId, button) {
    const story = this._stories.find((s) => s.id === storyId);
    if (!story) return;

    await this._indexedDBService.addFavoriteStory(story);

    button.classList.add("is-favorite");
    button.textContent = "❤️ Remove from Favorites";
    button.setAttribute("aria-label", "Remove from favorites");

    this.showSuccess("Story added to favorites!");
  }

  async _removeFavorite(storyId, button) {
    await this._indexedDBService.removeFavoriteStory(storyId);

    button.classList.remove("is-favorite");
    button.textContent = "🤍 Add to Favorites";
    button.setAttribute("aria-label", "Add to favorites");

    this.showSuccess("Story removed from favorites!");
  }

  _initMap() {
    this._map = L.map("map").setView([0, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this._map);

    this._stories.forEach((story) => {
      if (story.lat && story.lon) {
        const marker = L.marker([story.lat, story.lon]).addTo(this._map);

        marker.bindPopup(`
          <div class="map-popup">
            <img src="${story.photoUrl}" alt="Photo by ${story.name}">
            <h3>${story.name}</h3>
            <p>${this._truncateText(story.description, 50)}</p>
            <a href="#/detail/${story.id}">View Story</a>
          </div>
        `);
      }
    });
  }

  _truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }

  _formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  }

  showLoading() {
    const loadingElement = document.getElementById("loading");
    loadingElement.style.display = "block";
  }

  hideLoading() {
    const loadingElement = document.getElementById("loading");
    loadingElement.style.display = "none";
  }

  showError(message) {
    const errorContainer = document.getElementById("error-container");
    errorContainer.style.display = "block";
    errorContainer.innerHTML = `
      <div class="alert alert-danger">
        ${message}
      </div>
    `;
  }

  showSuccess(message) {
    const errorContainer = document.getElementById("error-container");
    errorContainer.style.display = "block";
    errorContainer.innerHTML = `
      <div class="alert alert-success">
        ${message}
      </div>
    `;

    // Auto-hide success message after 3 seconds
    setTimeout(() => {
      errorContainer.style.display = "none";
    }, 3000);
  }
}

export default HomePage;
