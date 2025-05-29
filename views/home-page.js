import StoryPresenter from "../presenters/story-presenter.js";

class HomePage {
  constructor(container) {
    this._container = container;
    this._presenter = new StoryPresenter(this);
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

    await this._fetchStories();
    this._initMap();
    this._renderStories();
  }

  async _fetchStories() {
    this._stories = await this._presenter.getStories(1, 10, 1);
  }

  _renderStories() {
    const storyListElement = document.getElementById("story-list");
    const loadingElement = document.getElementById("loading");

    loadingElement.style.display = "none";

    if (this._stories.length === 0) {
      storyListElement.innerHTML =
        "<p>No stories found. Please login to see stories or add new ones.</p>";
      return;
    }

    storyListElement.innerHTML = this._stories
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
          <p class="story-date">${this._formatDate(story.createdAt)}</p>
          <a href="#/detail/${story.id}" class="story-link">Read more</a>
        </div>
      </article>
    `
      )
      .join("");
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
}

export default HomePage;
