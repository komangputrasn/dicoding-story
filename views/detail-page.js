import StoryPresenter from "../presenters/story-presenter.js";
import IndexedDBService from "../services/indexeddb-service.js";

class DetailPage {
  constructor(container, id) {
    this._container = container;
    this._id = id;
    this._presenter = new StoryPresenter(this);
    this._indexedDBService = new IndexedDBService();
    this._story = null;
    this._map = null;
  }

  async render() {
    this._container.innerHTML = `
      <section class="page" role="region" aria-labelledby="detail-title">
        <h2 id="detail-title">Story Detail</h2>
        <div id="loading" role="status" aria-live="polite">Loading story...</div>
        <div id="error-container" role="alert" aria-live="assertive" style="display: none;"></div>
        <div id="story-detail" style="display: none;"></div>
      </section>
    `;

    await this._initIndexedDB();
    await this._fetchStory();
    this._renderStory();
  }

  async _initIndexedDB() {
    try {
      await this._indexedDBService.init();
    } catch (error) {
      console.error('Failed to initialize IndexedDB:', error);
    }
  }

  async _fetchStory() {
    try {
      this._story = await this._presenter.getStoryDetail(this._id);
    } catch (error) {
      console.error("Error fetching story:", error);
      // Try to get from IndexedDB cache
      try {
        this._story = await this._indexedDBService.getCachedStory(this._id);
        if (this._story) {
          console.log('Story loaded from cache');
        }
      } catch (cacheError) {
        console.error("Error loading from cache:", cacheError);
      }
    }
  }

  async _renderStory() {
    if (!this._story) return;

    document.getElementById("loading").style.display = "none";

    const storyDetail = document.getElementById("story-detail");
    storyDetail.style.display = "block";

    const isFavorite = await this._checkIfFavorite(this._story.id);

    storyDetail.innerHTML = `
      <div class="story-detail">
        <img src="${this._story.photoUrl}" alt="Photo by ${
      this._story.name
    }" class="story-img">
        <h3>${this._story.name}</h3>
        <p class="story-date">${this._formatDate(this._story.createdAt)}</p>
        <p class="story-description">${this._story.description}</p>
        <div class="story-actions">
          <button 
            id="favorite-btn" 
            class="favorite-btn ${isFavorite ? 'is-favorite' : ''}"
            aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}"
          >
            ${isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </button>
        </div>
        ${
          this._story.lat && this._story.lon
            ? '<div id="map" aria-label="Map showing story location"></div>'
            : ""
        }
        <a href="#/home">Back to Home</a>
      </div>
    `;

    this._initFavoriteButton();

    if (this._story.lat && this._story.lon) {
      this._initMap();
    }
  }

  async _checkIfFavorite(storyId) {
    try {
      return await this._indexedDBService.isFavoriteStory(storyId);
    } catch (error) {
      console.error('Failed to check favorite status:', error);
      return false;
    }
  }

  _initFavoriteButton() {
    const favoriteButton = document.getElementById('favorite-btn');
    
    favoriteButton.addEventListener('click', async (e) => {
      e.preventDefault();
      const isFavorite = favoriteButton.classList.contains('is-favorite');
      
      try {
        if (isFavorite) {
          await this._removeFavorite(favoriteButton);
        } else {
          await this._addFavorite(favoriteButton);
        }
      } catch (error) {
        console.error('Failed to update favorite:', error);
        this.showError('Failed to update favorite status');
      }
    });
  }

  async _addFavorite(button) {
    await this._indexedDBService.addFavoriteStory(this._story);
    
    button.classList.add('is-favorite');
    button.textContent = '❤️ Remove from Favorites';
    button.setAttribute('aria-label', 'Remove from favorites');
    
    this.showSuccess('Story added to favorites!');
  }

  async _removeFavorite(button) {
    await this._indexedDBService.removeFavoriteStory(this._story.id);
    
    button.classList.remove('is-favorite');
    button.textContent = '🤍 Add to Favorites';
    button.setAttribute('aria-label', 'Add to favorites');
    
    this.showSuccess('Story removed from favorites!');
  }

  _initMap() {
    this._map = L.map("map").setView([this._story.lat, this._story.lon], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this._map);

    const marker = L.marker([this._story.lat, this._story.lon]).addTo(
      this._map
    );
    marker
      .bindPopup(
        `
      <div class="map-popup">
        <img src="${this._story.photoUrl}" alt="Photo by ${this._story.name}">
        <h3>${this._story.name}</h3>
        <p>${this._truncateText(this._story.description, 50)}</p>
      </div>
    `
      )
      .openPopup();
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
      hour: "numeric",
      minute: "numeric",
    };
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
    document.getElementById("loading").style.display = "none";

    const errorContainer = document.getElementById("error-container");
    errorContainer.style.display = "block";
    errorContainer.innerHTML = `
      <div class="alert alert-danger">
        ${message}
      </div>
      <a href="#/home">Back to Home</a>
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

export default DetailPage;
