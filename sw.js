const CACHE_NAME = "dicoding-story-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/app.js",
  "/styles.css",
  "/manifest.json",
  "/views/home-page.js",
  "/views/add-story-page.js",
  "/views/login-page.js",
  "/views/register-page.js",
  "/views/detail-page.js",
  "/presenters/auth-presenter.js",
  "/presenters/base-presenter.js",
  "/presenters/story-presenter.js",
  "/services/api-service.js",
  "/services/auth-service.js",
  "/models/auth-model.js",
  "/models/story-model.js",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
];

// Install event - cache resources
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error("Failed to cache resources:", error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve cached content when offline
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (
    !event.request.url.startsWith(self.location.origin) &&
    !event.request.url.includes("unpkg.com") &&
    !event.request.url.includes("openstreetmap.org")
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      if (response) {
        return response;
      }

      return fetch(event.request)
        .then((response) => {
          // Don't cache if not a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // Return offline page for navigation requests
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        });
    })
  );
});

// Push notification event
self.addEventListener("push", (event) => {
  console.log("Push notification received:", event);

  let notificationData = {
    title: "Dicoding Story",
    body: "You have a new notification",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-72x72.png",
    tag: "story-notification",
  };

  if (event.data) {
    try {
      const data = event.data.json();
      notificationData = {
        title: data.title || notificationData.title,
        body: data.options?.body || notificationData.body,
        icon: data.options?.icon || notificationData.icon,
        badge: data.options?.badge || notificationData.badge,
        tag: data.options?.tag || notificationData.tag,
        data: data.options?.data || {},
      };
    } catch (error) {
      console.error("Error parsing push data:", error);
    }
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, {
      body: notificationData.body,
      icon: notificationData.icon,
      badge: notificationData.badge,
      tag: notificationData.tag,
      data: notificationData.data,
      requireInteraction: true,
      actions: [
        {
          action: "view",
          title: "View Story",
        },
        {
          action: "close",
          title: "Close",
        },
      ],
    })
  );
});

// Notification click event
self.addEventListener("notificationclick", (event) => {
  console.log("Notification click received:", event);

  event.notification.close();

  if (event.action === "view") {
    event.waitUntil(clients.openWindow("/"));
  }
});

// Background sync event (for offline story submission)
self.addEventListener("sync", (event) => {
  console.log("Background sync triggered:", event.tag);

  if (event.tag === "background-sync-story") {
    event.waitUntil(syncOfflineStories());
  }
});

// Function to sync offline stories
async function syncOfflineStories() {
  try {
    // Open IndexedDB and sync pending stories
    const db = await openDB();
    const transaction = db.transaction(["offline-stories"], "readonly");
    const store = transaction.objectStore("offline-stories");
    const offlineStories = await getAllFromStore(store);

    for (const story of offlineStories) {
      try {
        // Attempt to sync with server
        const response = await fetch("/api/stories", {
          method: "POST",
          body: story.formData,
        });

        if (response.ok) {
          // Remove from offline storage on successful sync
          const deleteTransaction = db.transaction(
            ["offline-stories"],
            "readwrite"
          );
          const deleteStore = deleteTransaction.objectStore("offline-stories");
          await deleteStore.delete(story.id);
        }
      } catch (error) {
        console.error("Failed to sync story:", error);
      }
    }
  } catch (error) {
    console.error("Background sync failed:", error);
  }
}

// Helper functions for IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("dicoding-story-db", 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("offline-stories")) {
        db.createObjectStore("offline-stories", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };
  });
}

function getAllFromStore(store) {
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}
