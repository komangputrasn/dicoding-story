/**
 * End-to-End Push Notification Test
 * Tests the complete push notification functionality
 */

console.log("🧪 Starting End-to-End Push Notification Test...\n");

// Test 1: Check browser support
console.log("📱 Test 1: Browser Support Check");
if ("Notification" in window) {
  console.log("✅ Browser supports notifications");
} else {
  console.log("❌ Browser does not support notifications");
}

if ("serviceWorker" in navigator) {
  console.log("✅ Browser supports service workers");
} else {
  console.log("❌ Browser does not support service workers");
}

if ("PushManager" in window) {
  console.log("✅ Browser supports push notifications");
} else {
  console.log("❌ Browser does not support push notifications");
}

// Test 2: Check current permission status
console.log("\n🔐 Test 2: Permission Status Check");
if ("Notification" in window) {
  console.log(`Current permission status: ${Notification.permission}`);

  switch (Notification.permission) {
    case "granted":
      console.log("✅ Notifications are allowed");
      break;
    case "denied":
      console.log("❌ Notifications are blocked");
      break;
    case "default":
      console.log("⚠️ Permission not yet requested");
      break;
  }
}

// Test 3: Service worker registration status
console.log("\n⚙️ Test 3: Service Worker Status");
navigator.serviceWorker
  .getRegistrations()
  .then((registrations) => {
    if (registrations.length > 0) {
      console.log(`✅ Service worker registered: ${registrations[0].scope}`);
      console.log(`Active: ${registrations[0].active ? "Yes" : "No"}`);
    } else {
      console.log("❌ No service worker registered");
    }
  })
  .catch((error) => {
    console.log(`❌ Error checking service worker: ${error.message}`);
  });

// Test 4: Test notification request (if not already granted/denied)
console.log("\n🔔 Test 4: Notification Request Test");
if ("Notification" in window && Notification.permission === "default") {
  console.log("⏳ Testing permission request...");
  Notification.requestPermission()
    .then((permission) => {
      console.log(`Permission result: ${permission}`);
      if (permission === "granted") {
        console.log("✅ Permission granted successfully");

        // Test a simple notification
        try {
          new Notification("Test Notification", {
            body: "Push notification test successful!",
            icon: "/icons/icon-192x192.png",
          });
          console.log("✅ Test notification sent");
        } catch (error) {
          console.log(`❌ Failed to send test notification: ${error.message}`);
        }
      } else {
        console.log("❌ Permission denied or not granted");
      }
    })
    .catch((error) => {
      console.log(`❌ Permission request failed: ${error.message}`);
    });
} else if (Notification.permission === "granted") {
  console.log("✅ Permission already granted");
} else if (Notification.permission === "denied") {
  console.log("❌ Permission already denied");
}

console.log("\n✨ End-to-End test initiated!");
console.log("Check the browser console for real-time results.");
