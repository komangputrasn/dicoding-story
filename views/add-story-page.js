import StoryPresenter from "../presenters/story-presenter.js";
import PushNotificationService from "../services/push-notification-service.js";
import IndexedDBService from "../services/indexeddb-service.js";

class AddStoryPage {
  constructor(container) {
    this._container = container;
    this._presenter = new StoryPresenter(this);
    this._pushNotificationService = new PushNotificationService();
    this._indexedDBService = new IndexedDBService();
    this._map = null;
    this._marker = null;
    this._position = null;
    this._photoBlob = null;
    this._stream = null;
  }

  async render() {
    this._container.innerHTML = `
      <section class="page form-container" role="region" aria-labelledby="add-story-title">
        <h2 id="add-story-title">Add New Story</h2>
        <div id="alert-container" role="alert" aria-live="assertive"></div>
        
        <!-- Push Notification Section -->
        <div id="notification-section" class="form-group">
          <h3>Push Notifications</h3>
          <div id="notification-status"></div>
          <button type="button" id="enable-notifications" style="display: none;">Enable Notifications</button>
          <button type="button" id="disable-notifications" style="display: none;">Disable Notifications</button>
        </div>
        
        <form id="add-story-form">
          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" name="description" rows="4" required></textarea>
          </div>

          <div class="form-group">
            <label for="map">Location (Click on map to set)</label>
            <div id="map" aria-label="Map to select story location" tabindex="0"></div>
            <p id="location-display" aria-live="polite">No location selected</p>
          </div>

          <div class="form-group camera-container">
            <label for="video">Take Photo with Camera</label>
            <video id="video" autoplay aria-label="Camera preview"></video>
            <canvas id="canvas"></canvas>
            <div class="camera-buttons">
              <button type="button" id="start-camera">Start Camera</button>
              <button type="button" id="capture-photo" disabled>Capture Photo</button>
              <button type="button" id="stop-camera" disabled>Stop Camera</button>
            </div>
          </div>

          <div class="preview-container">
            <label for="preview">Photo Preview</label>
            <img id="preview" src="" alt="Captured photo preview" style="display: none;">
          </div>

          <button type="submit" id="submit-button" disabled>Add Story</button>
        </form>
      </section>
    `;

    await this._initServices();
    this._initMap();
    this._initCameraButtons();
    this._initForm();
    this._initNotificationSection();
  }

  async _initServices() {
    try {
      await this._indexedDBService.init();
      await this._pushNotificationService.init();
    } catch (error) {
      console.error("Failed to initialize services:", error);
    }
  }

  _initMap() {
    this._map = L.map("map").setView([0, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this._map);

    this._map.on("click", (e) => {
      this._position = {
        lat: e.latlng.lat,
        lon: e.latlng.lng,
      };

      document.getElementById(
        "location-display"
      ).textContent = `Location: ${this._position.lat.toFixed(
        4
      )}, ${this._position.lon.toFixed(4)}`;

      if (this._marker) {
        this._marker.setLatLng(e.latlng);
      } else {
        this._marker = L.marker(e.latlng).addTo(this._map);
      }

      this._updateSubmitButton();
    });
  }

  _initCameraButtons() {
    const startCameraButton = document.getElementById("start-camera");
    const capturPhotoButton = document.getElementById("capture-photo");
    const stopCameraButton = document.getElementById("stop-camera");
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const preview = document.getElementById("preview");

    startCameraButton.addEventListener("click", async () => {
      try {
        this._stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        video.srcObject = this._stream;
        startCameraButton.disabled = true;
        capturPhotoButton.disabled = false;
        stopCameraButton.disabled = false;
      } catch (error) {
        console.error("Error accessing camera:", error);
        this.showError(`Failed to access camera: ${error.message}`);
      }
    });

    capturPhotoButton.addEventListener("click", () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          this._photoBlob = blob;

          const url = URL.createObjectURL(blob);
          preview.src = url;
          preview.style.display = "block";

          this._updateSubmitButton();
        },
        "image/jpeg",
        0.8
      );
    });

    stopCameraButton.addEventListener("click", () => {
      if (this._stream) {
        this._stream.getTracks().forEach((track) => track.stop());
        this._stream = null;
        video.srcObject = null;
      }

      startCameraButton.disabled = false;
      capturPhotoButton.disabled = true;
      stopCameraButton.disabled = true;
    });
  }

  _initForm() {
    const form = document.getElementById("add-story-form");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const description = document.getElementById("description").value;

      try {
        // Check if online
        if (navigator.onLine) {
          // Use presenter instead of directly calling the API
          await this._presenter.addStory(
            description,
            this._photoBlob,
            this._position?.lat,
            this._position?.lon
          );

          // Try to send push notification after successful story creation
          await this._sendStoryNotification(description);
        } else {
          // Save for offline sync
          await this._saveOfflineStory(description);
          this.showSuccess(
            "Story saved offline. It will be uploaded when you're back online."
          );
        }

        if (this._stream) {
          this._stream.getTracks().forEach((track) => track.stop());
        }

        setTimeout(() => {
          window.location.hash = "#/home";
        }, 2000);
      } catch (error) {
        // Error handling is managed by the presenter
        console.error(error);
      }
    });
  }

  async _saveOfflineStory(description) {
    try {
      await this._indexedDBService.addOfflineStory(
        description,
        this._photoBlob,
        this._position?.lat,
        this._position?.lon
      );

      // Register for background sync if supported
      if (
        "serviceWorker" in navigator &&
        "sync" in window.ServiceWorkerRegistration.prototype
      ) {
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register("background-sync-story");
      }
    } catch (error) {
      console.error("Failed to save offline story:", error);
      throw new Error("Failed to save story offline");
    }
  }

  async _sendStoryNotification(description) {
    try {
      // Check if push notifications are supported and subscribed
      const status =
        await this._pushNotificationService.getSubscriptionStatus();

      if (status.isSubscribed) {
        // The server will send the push notification
        console.log("Story created, push notification will be sent by server");
      }
    } catch (error) {
      console.error("Failed to handle push notification:", error);
      // Don't throw error as story creation was successful
    }
  }

  async _initNotificationSection() {
    const statusElement = document.getElementById("notification-status");
    const enableButton = document.getElementById("enable-notifications");
    const disableButton = document.getElementById("disable-notifications");

    try {
      // Check if notifications are supported
      if (!("Notification" in window) || !("PushManager" in window)) {
        statusElement.innerHTML =
          '<p class="alert alert-warning">⚠️ Push notifications are not supported in this browser</p>';
        enableButton.style.display = "none";
        disableButton.style.display = "none";
        return;
      }

      const permissionStatus =
        this._pushNotificationService.getPermissionStatus();
      const status =
        await this._pushNotificationService.getSubscriptionStatus();

      if (permissionStatus === "denied") {
        statusElement.innerHTML =
          '<p class="alert alert-error">🚫 Notifications are blocked. Please enable them in your browser settings.</p>';
        enableButton.style.display = "none";
        disableButton.style.display = "none";
      } else if (status.isSubscribed) {
        statusElement.innerHTML =
          '<p class="alert alert-success">✅ Push notifications are enabled</p>';
        disableButton.style.display = "inline-block";
        enableButton.style.display = "none";
      } else {
        statusElement.innerHTML =
          '<p class="alert alert-info">🔔 Enable push notifications to get notified when your stories are published</p>';
        enableButton.style.display = "inline-block";
        disableButton.style.display = "none";
      }
    } catch (error) {
      console.error("Error checking notification status:", error);
      statusElement.innerHTML =
        '<p class="alert alert-warning">⚠️ Unable to check notification status</p>';
      enableButton.style.display = "none";
      disableButton.style.display = "none";
    }

    enableButton.addEventListener("click", async () => {
      try {
        // Show loading state
        enableButton.disabled = true;
        enableButton.textContent = "Enabling...";

        // Check permission first
        const permissionStatus =
          this._pushNotificationService.getPermissionStatus();

        if (permissionStatus === "denied") {
          throw new Error(
            "Notifications are blocked. Please enable them in your browser settings and try again."
          );
        }

        await this._pushNotificationService.subscribe();
        await this._initNotificationSection(); // Refresh the section
        this.showSuccess("Push notifications enabled successfully!");
      } catch (error) {
        console.error("Failed to enable notifications:", error);

        // Provide specific error messages
        let errorMessage = "Failed to enable push notifications";
        if (error.message.includes("permission")) {
          errorMessage =
            "Permission denied. Please allow notifications in your browser and try again.";
        } else if (error.message.includes("login")) {
          errorMessage = "Please log in first to enable notifications.";
        } else if (error.message.includes("settings")) {
          errorMessage = error.message;
        }

        this.showError(errorMessage);
      } finally {
        // Reset button state
        enableButton.disabled = false;
        enableButton.textContent = "Enable Notifications";
      }
    });

    disableButton.addEventListener("click", async () => {
      try {
        await this._pushNotificationService.unsubscribe();
        await this._initNotificationSection(); // Refresh the section
        this.showSuccess("Push notifications disabled successfully!");
      } catch (error) {
        console.error("Failed to disable notifications:", error);
        this.showError("Failed to disable push notifications");
      }
    });
  }

  _updateSubmitButton() {
    const submitButton = document.getElementById("submit-button");
    submitButton.disabled = !this._photoBlob;
  }

  // Methods called by the presenter
  showLoading() {
    const submitButton = document.getElementById("submit-button");
    submitButton.textContent = "Adding Story...";
    submitButton.disabled = true;
  }

  hideLoading() {
    const submitButton = document.getElementById("submit-button");
    submitButton.textContent = "Add Story";
    submitButton.disabled = !this._photoBlob;
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

export default AddStoryPage;
