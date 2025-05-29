class IndexedDBService {
  constructor() {
    this.dbName = "dicoding-story-db";
    this.dbVersion = 1;
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => {
        console.error("Failed to open IndexedDB:", request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log("IndexedDB opened successfully");
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        this.db = event.target.result;
        this.createObjectStores();
      };
    });
  }

  createObjectStores() {
    // Store for favorite stories
    if (!this.db.objectStoreNames.contains("favorite-stories")) {
      const favoriteStore = this.db.createObjectStore("favorite-stories", {
        keyPath: "id",
      });
      favoriteStore.createIndex("createdAt", "createdAt", { unique: false });
    }

    // Store for offline stories (pending upload)
    if (!this.db.objectStoreNames.contains("offline-stories")) {
      const offlineStore = this.db.createObjectStore("offline-stories", {
        keyPath: "id",
        autoIncrement: true,
      });
      offlineStore.createIndex("timestamp", "timestamp", { unique: false });
    }

    // Store for cached stories for offline viewing
    if (!this.db.objectStoreNames.contains("cached-stories")) {
      const cachedStore = this.db.createObjectStore("cached-stories", {
        keyPath: "id",
      });
      cachedStore.createIndex("cachedAt", "cachedAt", { unique: false });
    }

    console.log("Object stores created successfully");
  }

  // Favorite Stories Operations
  async addFavoriteStory(story) {
    try {
      const transaction = this.db.transaction(
        ["favorite-stories"],
        "readwrite"
      );
      const store = transaction.objectStore("favorite-stories");

      const favoriteStory = {
        ...story,
        favoriteAt: new Date().toISOString(),
      };

      await this.executeTransaction(store.add(favoriteStory));
      console.log("Story added to favorites:", story.id);
      return true;
    } catch (error) {
      console.error("Failed to add favorite story:", error);
      throw error;
    }
  }

  async removeFavoriteStory(storyId) {
    try {
      const transaction = this.db.transaction(
        ["favorite-stories"],
        "readwrite"
      );
      const store = transaction.objectStore("favorite-stories");

      await this.executeTransaction(store.delete(storyId));
      console.log("Story removed from favorites:", storyId);
      return true;
    } catch (error) {
      console.error("Failed to remove favorite story:", error);
      throw error;
    }
  }

  async getFavoriteStories() {
    try {
      const transaction = this.db.transaction(["favorite-stories"], "readonly");
      const store = transaction.objectStore("favorite-stories");

      const result = await this.executeTransaction(store.getAll());
      console.log("Retrieved favorite stories:", result.length);
      return result;
    } catch (error) {
      console.error("Failed to get favorite stories:", error);
      return [];
    }
  }

  async isFavoriteStory(storyId) {
    try {
      const transaction = this.db.transaction(["favorite-stories"], "readonly");
      const store = transaction.objectStore("favorite-stories");

      const result = await this.executeTransaction(store.get(storyId));
      return !!result;
    } catch (error) {
      console.error("Failed to check favorite story:", error);
      return false;
    }
  }

  // Offline Stories Operations
  async addOfflineStory(description, photoBlob, lat, lon) {
    try {
      const transaction = this.db.transaction(["offline-stories"], "readwrite");
      const store = transaction.objectStore("offline-stories");

      const offlineStory = {
        description,
        photoBlob,
        lat,
        lon,
        timestamp: new Date().toISOString(),
        synced: false,
      };

      const result = await this.executeTransaction(store.add(offlineStory));
      console.log("Offline story added:", result);
      return result;
    } catch (error) {
      console.error("Failed to add offline story:", error);
      throw error;
    }
  }

  async getOfflineStories() {
    try {
      const transaction = this.db.transaction(["offline-stories"], "readonly");
      const store = transaction.objectStore("offline-stories");

      const result = await this.executeTransaction(store.getAll());
      console.log("Retrieved offline stories:", result.length);
      return result;
    } catch (error) {
      console.error("Failed to get offline stories:", error);
      return [];
    }
  }

  async removeOfflineStory(id) {
    try {
      const transaction = this.db.transaction(["offline-stories"], "readwrite");
      const store = transaction.objectStore("offline-stories");

      await this.executeTransaction(store.delete(id));
      console.log("Offline story removed:", id);
      return true;
    } catch (error) {
      console.error("Failed to remove offline story:", error);
      throw error;
    }
  }

  // Cached Stories Operations
  async cacheStory(story) {
    try {
      const transaction = this.db.transaction(["cached-stories"], "readwrite");
      const store = transaction.objectStore("cached-stories");

      const cachedStory = {
        ...story,
        cachedAt: new Date().toISOString(),
      };

      await this.executeTransaction(store.put(cachedStory));
      console.log("Story cached:", story.id);
      return true;
    } catch (error) {
      console.error("Failed to cache story:", error);
      throw error;
    }
  }

  async getCachedStories() {
    try {
      const transaction = this.db.transaction(["cached-stories"], "readonly");
      const store = transaction.objectStore("cached-stories");

      const result = await this.executeTransaction(store.getAll());
      console.log("Retrieved cached stories:", result.length);
      return result;
    } catch (error) {
      console.error("Failed to get cached stories:", error);
      return [];
    }
  }

  async getCachedStory(storyId) {
    try {
      const transaction = this.db.transaction(["cached-stories"], "readonly");
      const store = transaction.objectStore("cached-stories");

      const result = await this.executeTransaction(store.get(storyId));
      return result;
    } catch (error) {
      console.error("Failed to get cached story:", error);
      return null;
    }
  }

  // Clear old cached stories (older than 7 days)
  async clearOldCachedStories() {
    try {
      const transaction = this.db.transaction(["cached-stories"], "readwrite");
      const store = transaction.objectStore("cached-stories");
      const index = store.index("cachedAt");

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const range = IDBKeyRange.upperBound(sevenDaysAgo.toISOString());
      const request = index.openCursor(range);

      return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            cursor.delete();
            cursor.continue();
          } else {
            console.log("Old cached stories cleared");
            resolve();
          }
        };

        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("Failed to clear old cached stories:", error);
    }
  }

  // Utility method to execute transactions
  executeTransaction(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Close database connection
  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
      console.log("IndexedDB connection closed");
    }
  }
}

export default IndexedDBService;
