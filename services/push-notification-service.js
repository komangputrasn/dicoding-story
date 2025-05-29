import AuthService from "./auth-service.js";

class PushNotificationService {
  constructor() {
    this.authService = new AuthService();
    this.vapidPublicKey =
      "BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk";
    this.apiBaseUrl = "https://story-api.dicoding.dev/v1";
    this.registration = null;
  }

  async init() {
    try {
      // Check if service worker is supported
      if (!("serviceWorker" in navigator)) {
        throw new Error("Service Worker not supported");
      }

      // Check if push messaging is supported
      if (!("PushManager" in window)) {
        throw new Error("Push messaging not supported");
      }

      // Get service worker registration
      this.registration = await navigator.serviceWorker.ready;
      console.log("Push notification service initialized");

      return true;
    } catch (error) {
      console.error("Failed to initialize push notification service:", error);
      throw error;
    }
  }
  async requestPermission() {
    try {
      // Check if Notification API is supported
      if (!("Notification" in window)) {
        throw new Error("This browser does not support notifications");
      }

      // Check current permission status
      let permission = Notification.permission;

      if (permission === "default") {
        // Request permission
        permission = await Notification.requestPermission();
      }

      if (permission === "granted") {
        console.log("Notification permission granted");
        return true;
      } else if (permission === "denied") {
        console.log("Notification permission denied");
        throw new Error("Notification permission was denied. Please enable notifications in your browser settings.");
      } else {
        console.log("Notification permission dismissed");
        throw new Error("Notification permission was not granted");
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      throw error;
    }
  }
  async subscribe() {
    try {
      // Check if user is logged in
      if (!this.authService.isLoggedIn()) {
        throw new Error("User must be logged in to subscribe to notifications");
      }

      // Initialize if not already done
      if (!this.registration) {
        await this.init();
      }

      // Request permission explicitly first
      await this.requestPermission();

      // Check if already subscribed
      const existingSubscription =
        await this.registration.pushManager.getSubscription();
      if (existingSubscription) {
        console.log("Already subscribed to push notifications");
        return existingSubscription;
      }

      // Create new subscription
      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey),
      });

      // Send subscription to server
      await this.sendSubscriptionToServer(subscription);

      console.log("Successfully subscribed to push notifications");
      return subscription;
    } catch (error) {
      console.error("Failed to subscribe to push notifications:", error);
      throw error;
    }
  }

  async unsubscribe() {
    try {
      if (!this.registration) {
        await this.init();
      }

      const subscription =
        await this.registration.pushManager.getSubscription();

      if (!subscription) {
        console.log("Not subscribed to push notifications");
        return true;
      }

      // Unsubscribe from browser
      await subscription.unsubscribe();

      // Remove subscription from server
      await this.removeSubscriptionFromServer(subscription);

      console.log("Successfully unsubscribed from push notifications");
      return true;
    } catch (error) {
      console.error("Failed to unsubscribe from push notifications:", error);
      throw error;
    }
  }

  async getSubscriptionStatus() {
    try {
      if (!this.registration) {
        await this.init();
      }

      const subscription =
        await this.registration.pushManager.getSubscription();
      return {
        isSubscribed: !!subscription,
        subscription: subscription,
      };
    } catch (error) {
      console.error("Failed to get subscription status:", error);
      return {
        isSubscribed: false,
        subscription: null,
      };
    }
  }

  async sendSubscriptionToServer(subscription) {
    try {
      const token = this.authService.getToken();

      const subscriptionData = {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: this.arrayBufferToBase64(subscription.getKey("p256dh")),
          auth: this.arrayBufferToBase64(subscription.getKey("auth")),
        },
      };

      const response = await fetch(
        `${this.apiBaseUrl}/notifications/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(subscriptionData),
        }
      );

      const responseData = await response.json();

      if (!response.ok || responseData.error) {
        throw new Error(
          responseData.message || "Failed to subscribe on server"
        );
      }

      console.log("Subscription sent to server successfully");
      return responseData;
    } catch (error) {
      console.error("Failed to send subscription to server:", error);
      throw error;
    }
  }

  async removeSubscriptionFromServer(subscription) {
    try {
      const token = this.authService.getToken();

      const subscriptionData = {
        endpoint: subscription.endpoint,
      };

      const response = await fetch(
        `${this.apiBaseUrl}/notifications/subscribe`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(subscriptionData),
        }
      );

      const responseData = await response.json();

      if (!response.ok || responseData.error) {
        throw new Error(
          responseData.message || "Failed to unsubscribe on server"
        );
      }

      console.log("Subscription removed from server successfully");
      return responseData;
    } catch (error) {
      console.error("Failed to remove subscription from server:", error);
      throw error;
    }
  }

  // Helper method to convert VAPID key
  urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Helper method to convert ArrayBuffer to base64
  arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  // Test notification (for development)
  async sendTestNotification() {
    try {
      if (Notification.permission === "granted") {
        new Notification("Test Notification", {
          body: "This is a test notification from Dicoding Story App",
          icon: "/icons/icon-192x192.png",
          badge: "/icons/icon-72x72.png",
        });
      }
    } catch (error) {
      console.error("Failed to send test notification:", error);
    }
  }

  getPermissionStatus() {
    if (!("Notification" in window)) {
      return "unsupported";
    }
    return Notification.permission;
  }

  isPermissionGranted() {
    return this.getPermissionStatus() === "granted";
  }
}

export default PushNotificationService;
