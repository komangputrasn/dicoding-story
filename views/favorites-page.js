import IndexedDBService from "../services/indexeddb-service.js";

class FavoritesPage {
  constructor(container) {
    this._container = container;
    this._indexedDBService = new IndexedDBService();
    this._favoriteStories = [];
  }

  async render() {
    this._container.innerHTML = `
      <section class="page" role="region" aria-labelledby="favorites-title">
        <h2 id="favorites-title">Favorite Stories</h2>
        <div id="loading" role="status" aria-live="polite">Loading favorite stories...</div>
        <div id="error-container" role="alert" aria-live="assertive" style="display:none;"></div>
        <div id="empty-state" style="display:none;">
          <p>You haven't saved any favorite stories yet.</p>
          <p><a href="#/home">Browse stories</a> and click the heart icon to add them to your favorites.</p>
        </div>
        <div id="favorites-list" class="story-list"></div>
        <div id="bulk-actions" style="display:none;">
          <button id="clear-all-favorites" type="button">Clear All Favorites</button>
        </div>
      </section>
    `;

    await this._initIndexedDB();
    await this._loadFavoriteStories();
    this._renderFavoriteStories();
    this._initBulkActions();
  }

  async _initIndexedDB() {
    try {
      await this._indexedDBService.init();
    } catch (error) {
      console.error("Failed to initialize IndexedDB:", error);
      this.showError(
        "Failed to load favorites. Please try refreshing the page."
      );
    }
  }

  async _loadFavoriteStories() {
    try {
      this._favoriteStories = await this._indexedDBService.getFavoriteStories();
      console.log("Loaded favorite stories:", this._favoriteStories.length);
    } catch (error) {
      console.error("Failed to load favorite stories:", error);
      this.showError("Failed to load favorite stories.");
    }
  }

  _renderFavoriteStories() {
    const loadingElement = document.getElementById("loading");
    const favoritesListElement = document.getElementById("favorites-list");
    const emptyStateElement = document.getElementById("empty-state");
    const bulkActionsElement = document.getElementById("bulk-actions");

    loadingElement.style.display = "none";

    if (this._favoriteStories.length === 0) {
      emptyStateElement.style.display = "block";
      favoritesListElement.style.display = "none";
      bulkActionsElement.style.display = "none";
      return;
    }

    emptyStateElement.style.display = "none";
    favoritesListElement.style.display = "grid";
    bulkActionsElement.style.display = "block";

    favoritesListElement.innerHTML = this._favoriteStories
      .sort((a, b) => new Date(b.favoriteAt) - new Date(a.favoriteAt))
      .map(
        (story) => `
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
          <p class="story-date">Added to favorites: ${this._formatDate(
            story.favoriteAt
          )}</p>
          <div class="story-actions">
            <a href="#/detail/${story.id}" class="story-link">Read more</a>
            <button 
              class="remove-favorite-btn" 
              data-story-id="${story.id}"
              aria-label="Remove ${story.name} from favorites"
            >
              Remove from Favorites
            </button>
          </div>
        </div>
      </article>
    `
      )
      .join("");

    this._initRemoveFavoriteButtons();
  }

  _initRemoveFavoriteButtons() {
    const removeButtons = document.querySelectorAll(".remove-favorite-btn");

    removeButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        const storyId = button.dataset.storyId;
        await this._removeFavoriteStory(storyId);
      });
    });
  }

  _initBulkActions() {
    const clearAllButton = document.getElementById("clear-all-favorites");

    clearAllButton.addEventListener("click", async () => {
      const confirmed = confirm(
        "Are you sure you want to remove all favorite stories?"
      );
      if (confirmed) {
        await this._clearAllFavorites();
      }
    });
  }

  async _removeFavoriteStory(storyId) {
    try {
      await this._indexedDBService.removeFavoriteStory(storyId);

      // Remove from local array
      this._favoriteStories = this._favoriteStories.filter(
        (story) => story.id !== storyId
      );

      // Re-render the list
      this._renderFavoriteStories();

      this.showSuccess("Story removed from favorites");
    } catch (error) {
      console.error("Failed to remove favorite story:", error);
      this.showError("Failed to remove story from favorites");
    }
  }

  async _clearAllFavorites() {
    try {
      // Remove all favorites one by one
      for (const story of this._favoriteStories) {
        await this._indexedDBService.removeFavoriteStory(story.id);
      }

      this._favoriteStories = [];
      this._renderFavoriteStories();

      this.showSuccess("All favorite stories removed");
    } catch (error) {
      console.error("Failed to clear all favorites:", error);
      this.showError("Failed to clear favorite stories");
    }
  }

  _truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }

  _formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  }

  showLoading() {
    const loadingElement = document.getElementById("loading");
    if (loadingElement) {
      loadingElement.style.display = "block";
    }
  }

  hideLoading() {
    const loadingElement = document.getElementById("loading");
    if (loadingElement) {
      loadingElement.style.display = "none";
    }
  }

  showError(message) {
    const errorContainer = document.getElementById("error-container");
    if (errorContainer) {
      errorContainer.style.display = "block";
      errorContainer.innerHTML = `
        <div class="alert alert-danger">
          ${message}
        </div>
      `;
    }
  }

  showSuccess(message) {
    const errorContainer = document.getElementById("error-container");
    if (errorContainer) {
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
}

export default FavoritesPage;
