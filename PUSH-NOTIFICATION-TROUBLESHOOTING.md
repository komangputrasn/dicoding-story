# Push Notification Troubleshooting Guide

## Common Issues and Solutions

### Issue: "Failed to subscribe to push notifications: Error: Notification permission not granted"

#### Possible Causes:

1. **Permission Blocked**: User denied notification permissions
2. **Browser Settings**: Notifications disabled in browser settings
3. **HTTPS Requirement**: Push notifications require HTTPS (except localhost)
4. **Browser Support**: Some browsers don't support push notifications

#### Solutions:

#### 1. Check Permission Status

```javascript
// Check current permission
console.log("Notification permission:", Notification.permission);

// Possible values: 'default', 'granted', 'denied'
```

#### 2. Reset Browser Permissions

- **Chrome**: Settings → Privacy & Security → Site Settings → Notifications
- **Firefox**: Settings → Privacy & Security → Permissions → Notifications
- **Edge**: Settings → Site Permissions → Notifications

#### 3. Manual Permission Request

```javascript
// Request permission manually
const permission = await Notification.requestPermission();
if (permission === "granted") {
  console.log("Permission granted!");
}
```

#### 4. Browser-Specific Issues

**Chrome:**

- Ensure site is HTTPS (production) or localhost (development)
- Check if "Block" is not enabled for the site
- Try incognito mode to test fresh permissions

**Firefox:**

- Check about:preferences#privacy → Permissions → Notifications
- Ensure notifications are not blocked globally

**Safari:**

- Push notifications require user interaction to subscribe
- Check Safari preferences → Websites → Notifications

#### 5. Development vs Production

**Development (localhost:1234):**

- ✅ HTTP allowed for localhost
- ✅ Self-signed certificates OK
- ✅ Service Worker registration works

**Production (GitHub Pages):**

- ✅ HTTPS required
- ✅ Valid SSL certificate needed
- ✅ Service Worker must be served over HTTPS

### Testing Steps:

1. **Check Browser Support:**

   ```javascript
   if ("Notification" in window && "PushManager" in window) {
     console.log("Push notifications supported");
   }
   ```

2. **Check Service Worker:**

   ```javascript
   if ("serviceWorker" in navigator) {
     const registration = await navigator.serviceWorker.getRegistration();
     console.log("SW registered:", !!registration);
   }
   ```

3. **Test Permission Flow:**

   - Go to `/notification-test.html` for detailed testing
   - Click "Test Permission Request"
   - Allow when browser prompts

4. **Check Network Tab:**
   - Open DevTools → Network
   - Look for subscription requests to `/notifications/subscribe`
   - Check for any 400/500 errors

### Implementation Notes:

#### Improved Error Handling:

```javascript
// Better error messages
try {
  await pushNotificationService.subscribe();
} catch (error) {
  if (error.message.includes("permission")) {
    showError("Permission denied. Please allow notifications and try again.");
  } else if (error.message.includes("login")) {
    showError("Please log in first to enable notifications.");
  } else {
    showError("Failed to enable notifications: " + error.message);
  }
}
```

#### Permission Status Check:

```javascript
// Check before subscribing
const permissionStatus = Notification.permission;
if (permissionStatus === "denied") {
  throw new Error("Notifications blocked. Enable in browser settings.");
}
```

### URLs for Testing:

- **Local Development**: http://localhost:1234
- **Production**: https://komangputrasn.github.io/dicoding-story
- **Notification Test**: http://localhost:1234/notification-test.html

### API Requirements:

The app uses the Dicoding Story API for push notification subscriptions:

- **Endpoint**: `POST /notifications/subscribe`
- **VAPID Key**: Pre-configured in the service
- **Authentication**: Bearer token required

### Browser DevTools:

1. **Application Tab**: Check Service Worker status and Push subscription
2. **Console**: Look for error messages and logs
3. **Network**: Monitor API requests and responses
4. **Security**: Ensure HTTPS in production

---

If issues persist, try:

1. Clear browser data and cache
2. Test in different browsers
3. Check browser console for detailed error messages
4. Verify user is logged in before testing notifications
