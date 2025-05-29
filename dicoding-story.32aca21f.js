var e=class{constructor(e){this._view=e}init(){}handleError(e,t="An error occurred"){let i=e.message||t;return this._view&&"function"==typeof this._view.showError&&this._view.showError(i),console.error("Presenter error:",e),i}},t=class{constructor(){this._storageKey="dicodingStoryAuth"}setAuth(e){localStorage.setItem(this._storageKey,JSON.stringify(e))}getAuth(){let e=localStorage.getItem(this._storageKey);return e?JSON.parse(e):null}isLoggedIn(){return!!this.getAuth()}getToken(){let e=this.getAuth();return e?e.token:null}getUserName(){let e=this.getAuth();return e?e.name:null}logout(){localStorage.removeItem(this._storageKey)}},i=class{constructor(){this._baseUrl="https://story-api.dicoding.dev/v1",this._authService=new t}_getAuthHeader(){let e=this._authService.getToken();return console.log("Auth token: "+e),e?{Authorization:`Bearer ${e}`}:{}}async register(e,t,i){try{let o=await fetch(`${this._baseUrl}/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,email:t,password:i})}),r=await o.json();if(r.error)throw Error(r.message);return r}catch(e){throw Error(`Register failed: ${e.message}`)}}async login(e,t){try{let i=await fetch(`${this._baseUrl}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t})}),o=await i.json();if(o.error)throw Error(o.message);return this._authService.setAuth({token:o.loginResult.token,name:o.loginResult.name,userId:o.loginResult.userId}),o}catch(e){throw Error(`Login failed: ${e.message}`)}}async getStories(e=1,t=10,i=1){try{let o=new URL(`${this._baseUrl}/stories`);o.searchParams.append("page",e),o.searchParams.append("size",t),o.searchParams.append("location",i);let r=await fetch(o,{headers:this._getAuthHeader()}),s=await r.json();if(s.error)throw Error(s.message);return s.listStory}catch(e){if(!this._authService.isLoggedIn())return this._getStoriesAsGuest();throw Error(`Failed to get stories: ${e.message}`)}}async _getStoriesAsGuest(){try{return[]}catch(e){throw Error(`Failed to get stories as guest: ${e.message}`)}}async getStoryDetail(e){try{let t=await fetch(`${this._baseUrl}/stories/${e}`,{headers:this._getAuthHeader()}),i=await t.json();if(i.error)throw Error(i.message);return i.story}catch(e){throw Error(`Failed to get story detail: ${e.message}`)}}async addStory(e,t,i,o){try{let r=new FormData;r.append("description",e),r.append("photo",t),i&&o&&(r.append("lat",i),r.append("lon",o));let s=this._authService.isLoggedIn()?`${this._baseUrl}/stories`:`${this._baseUrl}/stories/guest`,a=this._authService.isLoggedIn()?this._getAuthHeader():{},n=await fetch(s,{method:"POST",headers:a,body:r}),l=await n.json();if(l.error)throw Error(l.message);return l}catch(e){throw Error(`Failed to add story: ${e.message}`)}}},o=class{constructor(){this._apiService=new i}async getStories(e=1,t=10,i=1){return await this._apiService.getStories(e,t,i)}async getStoryDetail(e){return await this._apiService.getStoryDetail(e)}async addStory(e,t,i,o){return await this._apiService.addStory(e,t,i,o)}},r=class extends e{constructor(e){super(e),this._storyModel=new o}async getStories(e=1,t=10,i=1){try{return this._view.showLoading(),await this._storyModel.getStories(e,t,i)}catch(e){return this._view.showError(`Failed to load stories: ${e.message}`),[]}finally{this._view.hideLoading()}}async getStoryDetail(e){try{return this._view.showLoading(),await this._storyModel.getStoryDetail(e)}catch(e){throw this._view.showError(`Failed to load story: ${e.message}`),e}finally{this._view.hideLoading()}}async addStory(e,t,i,o){try{this._view.showLoading();let r=await this._storyModel.addStory(e,t,i,o);return this._view.showSuccess("Story added successfully. Redirecting to home page..."),r}catch(e){throw this._view.showError(`Failed to add story: ${e.message}`),e}finally{this._view.hideLoading()}}},s=class{constructor(){this.dbName="dicoding-story-db",this.dbVersion=1,this.db=null}async init(){return new Promise((e,t)=>{let i=indexedDB.open(this.dbName,this.dbVersion);i.onerror=()=>{console.error("Failed to open IndexedDB:",i.error),t(i.error)},i.onsuccess=()=>{this.db=i.result,console.log("IndexedDB opened successfully"),e(this.db)},i.onupgradeneeded=e=>{this.db=e.target.result,this.createObjectStores()}})}createObjectStores(){this.db.objectStoreNames.contains("favorite-stories")||this.db.createObjectStore("favorite-stories",{keyPath:"id"}).createIndex("createdAt","createdAt",{unique:!1}),this.db.objectStoreNames.contains("offline-stories")||this.db.createObjectStore("offline-stories",{keyPath:"id",autoIncrement:!0}).createIndex("timestamp","timestamp",{unique:!1}),this.db.objectStoreNames.contains("cached-stories")||this.db.createObjectStore("cached-stories",{keyPath:"id"}).createIndex("cachedAt","cachedAt",{unique:!1}),console.log("Object stores created successfully")}async addFavoriteStory(e){try{let t=this.db.transaction(["favorite-stories"],"readwrite").objectStore("favorite-stories"),i={...e,favoriteAt:new Date().toISOString()};return await this.executeTransaction(t.add(i)),console.log("Story added to favorites:",e.id),!0}catch(e){throw console.error("Failed to add favorite story:",e),e}}async removeFavoriteStory(e){try{let t=this.db.transaction(["favorite-stories"],"readwrite").objectStore("favorite-stories");return await this.executeTransaction(t.delete(e)),console.log("Story removed from favorites:",e),!0}catch(e){throw console.error("Failed to remove favorite story:",e),e}}async getFavoriteStories(){try{let e=this.db.transaction(["favorite-stories"],"readonly").objectStore("favorite-stories"),t=await this.executeTransaction(e.getAll());return console.log("Retrieved favorite stories:",t.length),t}catch(e){return console.error("Failed to get favorite stories:",e),[]}}async isFavoriteStory(e){try{let t=this.db.transaction(["favorite-stories"],"readonly").objectStore("favorite-stories");return!!await this.executeTransaction(t.get(e))}catch(e){return console.error("Failed to check favorite story:",e),!1}}async addOfflineStory(e,t,i,o){try{let r=this.db.transaction(["offline-stories"],"readwrite").objectStore("offline-stories"),s={description:e,photoBlob:t,lat:i,lon:o,timestamp:new Date().toISOString(),synced:!1},a=await this.executeTransaction(r.add(s));return console.log("Offline story added:",a),a}catch(e){throw console.error("Failed to add offline story:",e),e}}async getOfflineStories(){try{let e=this.db.transaction(["offline-stories"],"readonly").objectStore("offline-stories"),t=await this.executeTransaction(e.getAll());return console.log("Retrieved offline stories:",t.length),t}catch(e){return console.error("Failed to get offline stories:",e),[]}}async removeOfflineStory(e){try{let t=this.db.transaction(["offline-stories"],"readwrite").objectStore("offline-stories");return await this.executeTransaction(t.delete(e)),console.log("Offline story removed:",e),!0}catch(e){throw console.error("Failed to remove offline story:",e),e}}async cacheStory(e){try{let t=this.db.transaction(["cached-stories"],"readwrite").objectStore("cached-stories"),i={...e,cachedAt:new Date().toISOString()};return await this.executeTransaction(t.put(i)),console.log("Story cached:",e.id),!0}catch(e){throw console.error("Failed to cache story:",e),e}}async getCachedStories(){try{let e=this.db.transaction(["cached-stories"],"readonly").objectStore("cached-stories"),t=await this.executeTransaction(e.getAll());return console.log("Retrieved cached stories:",t.length),t}catch(e){return console.error("Failed to get cached stories:",e),[]}}async getCachedStory(e){try{let t=this.db.transaction(["cached-stories"],"readonly").objectStore("cached-stories");return await this.executeTransaction(t.get(e))}catch(e){return console.error("Failed to get cached story:",e),null}}async clearOldCachedStories(){try{let e=this.db.transaction(["cached-stories"],"readwrite").objectStore("cached-stories").index("cachedAt"),t=new Date;t.setDate(t.getDate()-7);let i=IDBKeyRange.upperBound(t.toISOString()),o=e.openCursor(i);return new Promise((e,t)=>{o.onsuccess=t=>{let i=t.target.result;i?(i.delete(),i.continue()):(console.log("Old cached stories cleared"),e())},o.onerror=()=>t(o.error)})}catch(e){console.error("Failed to clear old cached stories:",e)}}executeTransaction(e){return new Promise((t,i)=>{e.onsuccess=()=>t(e.result),e.onerror=()=>i(e.error)})}close(){this.db&&(this.db.close(),this.db=null,console.log("IndexedDB connection closed"))}},a=class{constructor(e){this._container=e,this._presenter=new r(this),this._indexedDBService=new s,this._stories=[],this._map=null}async render(){this._container.innerHTML=`
      <section class="page" role="region" aria-labelledby="home-title">
        <h2 id="home-title">Latest Stories</h2>
        <div id="loading" role="status" aria-live="polite">Loading stories...</div>
        <div id="error-container" role="alert" aria-live="assertive" style="display:none;"></div>
        <div id="map" aria-label="Map showing story locations"></div>
        <div id="story-list" class="story-list"></div>
      </section>
    `,await this._initIndexedDB(),await this._fetchStories(),this._initMap(),this._renderStories()}async _initIndexedDB(){try{await this._indexedDBService.init()}catch(e){console.error("Failed to initialize IndexedDB:",e)}}async _fetchStories(){this._stories=await this._presenter.getStories(1,10,1)}async _renderStories(){let e=document.getElementById("story-list");if(document.getElementById("loading").style.display="none",0===this._stories.length){e.innerHTML="<p>No stories found. Please login to see stories or add new ones.</p>";return}for(let e of this._stories)try{await this._indexedDBService.cacheStory(e)}catch(e){console.error("Failed to cache story:",e)}e.innerHTML=await Promise.all(this._stories.map(async e=>{let t=await this._checkIfFavorite(e.id);return`
      <article class="story-item">
        <img src="${e.photoUrl}" alt="Photo by ${e.name}" class="story-img">
        <div class="story-content">
          <h3>${e.name}</h3>
          <p class="story-description">${this._truncateText(e.description,100)}</p>
          <p class="story-date">${this._formatDate(e.createdAt)}</p>
          <div class="story-actions">
            <a href="#/detail/${e.id}" class="story-link">Read more</a>
            <button 
              class="favorite-btn ${t?"is-favorite":""}" 
              data-story-id="${e.id}"
              aria-label="${t?"Remove from favorites":"Add to favorites"}"
            >
              ${t?"❤️ Remove from Favorites":"\uD83E\uDD0D Add to Favorites"}
            </button>
          </div>
        </div>
      </article>
    `})).then(e=>e.join("")),this._initFavoriteButtons()}async _checkIfFavorite(e){try{return await this._indexedDBService.isFavoriteStory(e)}catch(e){return console.error("Failed to check favorite status:",e),!1}}_initFavoriteButtons(){document.querySelectorAll(".favorite-btn").forEach(e=>{e.addEventListener("click",async t=>{t.preventDefault();let i=e.dataset.storyId,o=e.classList.contains("is-favorite");try{o?await this._removeFavorite(i,e):await this._addFavorite(i,e)}catch(e){console.error("Failed to update favorite:",e),this.showError("Failed to update favorite status")}})})}async _addFavorite(e,t){let i=this._stories.find(t=>t.id===e);i&&(await this._indexedDBService.addFavoriteStory(i),t.classList.add("is-favorite"),t.textContent="❤️ Remove from Favorites",t.setAttribute("aria-label","Remove from favorites"),this.showSuccess("Story added to favorites!"))}async _removeFavorite(e,t){await this._indexedDBService.removeFavoriteStory(e),t.classList.remove("is-favorite"),t.textContent="\uD83E\uDD0D Add to Favorites",t.setAttribute("aria-label","Add to favorites"),this.showSuccess("Story removed from favorites!")}_initMap(){this._map=L.map("map").setView([0,0],2),L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(this._map),this._stories.forEach(e=>{e.lat&&e.lon&&L.marker([e.lat,e.lon]).addTo(this._map).bindPopup(`
          <div class="map-popup">
            <img src="${e.photoUrl}" alt="Photo by ${e.name}">
            <h3>${e.name}</h3>
            <p>${this._truncateText(e.description,50)}</p>
            <a href="#/detail/${e.id}">View Story</a>
          </div>
        `)})}_truncateText(e,t){return e.length<=t?e:e.substring(0,t)+"..."}_formatDate(e){return new Date(e).toLocaleDateString("id-ID",{year:"numeric",month:"short",day:"numeric"})}showLoading(){document.getElementById("loading").style.display="block"}hideLoading(){document.getElementById("loading").style.display="none"}showError(e){let t=document.getElementById("error-container");t.style.display="block",t.innerHTML=`
      <div class="alert alert-danger">
        ${e}
      </div>
    `}showSuccess(e){let t=document.getElementById("error-container");t.style.display="block",t.innerHTML=`
      <div class="alert alert-success">
        ${e}
      </div>
    `,setTimeout(()=>{t.style.display="none"},3e3)}},n=class{constructor(){this.authService=new t,this.vapidPublicKey="BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk",this.apiBaseUrl="https://story-api.dicoding.dev/v1",this.registration=null}async init(){try{if(!("serviceWorker"in navigator))throw Error("Service Worker not supported");if(!("PushManager"in window))throw Error("Push messaging not supported");return this.registration=await navigator.serviceWorker.ready,console.log("Push notification service initialized"),!0}catch(e){throw console.error("Failed to initialize push notification service:",e),e}}async requestPermission(){try{let e=await Notification.requestPermission();if("granted"===e)return console.log("Notification permission granted"),!0;if("denied"===e)return console.log("Notification permission denied"),!1;return console.log("Notification permission dismissed"),!1}catch(e){return console.error("Error requesting notification permission:",e),!1}}async subscribe(){try{if(!this.authService.isLoggedIn())throw Error("User must be logged in to subscribe to notifications");if("granted"!==Notification.permission&&!await this.requestPermission())throw Error("Notification permission not granted");this.registration||await this.init();let e=await this.registration.pushManager.getSubscription();if(e)return console.log("Already subscribed to push notifications"),e;let t=await this.registration.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:this.urlBase64ToUint8Array(this.vapidPublicKey)});return await this.sendSubscriptionToServer(t),console.log("Successfully subscribed to push notifications"),t}catch(e){throw console.error("Failed to subscribe to push notifications:",e),e}}async unsubscribe(){try{this.registration||await this.init();let e=await this.registration.pushManager.getSubscription();if(!e)return console.log("Not subscribed to push notifications"),!0;return await e.unsubscribe(),await this.removeSubscriptionFromServer(e),console.log("Successfully unsubscribed from push notifications"),!0}catch(e){throw console.error("Failed to unsubscribe from push notifications:",e),e}}async getSubscriptionStatus(){try{this.registration||await this.init();let e=await this.registration.pushManager.getSubscription();return{isSubscribed:!!e,subscription:e}}catch(e){return console.error("Failed to get subscription status:",e),{isSubscribed:!1,subscription:null}}}async sendSubscriptionToServer(e){try{let t=this.authService.getToken(),i={endpoint:e.endpoint,keys:{p256dh:this.arrayBufferToBase64(e.getKey("p256dh")),auth:this.arrayBufferToBase64(e.getKey("auth"))}},o=await fetch(`${this.apiBaseUrl}/notifications/subscribe`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(i)}),r=await o.json();if(!o.ok||r.error)throw Error(r.message||"Failed to subscribe on server");return console.log("Subscription sent to server successfully"),r}catch(e){throw console.error("Failed to send subscription to server:",e),e}}async removeSubscriptionFromServer(e){try{let t=this.authService.getToken(),i={endpoint:e.endpoint},o=await fetch(`${this.apiBaseUrl}/notifications/subscribe`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(i)}),r=await o.json();if(!o.ok||r.error)throw Error(r.message||"Failed to unsubscribe on server");return console.log("Subscription removed from server successfully"),r}catch(e){throw console.error("Failed to remove subscription from server:",e),e}}urlBase64ToUint8Array(e){let t="=".repeat((4-e.length%4)%4),i=(e+t).replace(/-/g,"+").replace(/_/g,"/"),o=window.atob(i),r=new Uint8Array(o.length);for(let e=0;e<o.length;++e)r[e]=o.charCodeAt(e);return r}arrayBufferToBase64(e){let t=new Uint8Array(e),i="";for(let e=0;e<t.byteLength;e++)i+=String.fromCharCode(t[e]);return window.btoa(i)}async sendTestNotification(){try{"granted"===Notification.permission&&new Notification("Test Notification",{body:"This is a test notification from Dicoding Story App",icon:"/icons/icon-192x192.png",badge:"/icons/icon-72x72.png"})}catch(e){console.error("Failed to send test notification:",e)}}},l=class{constructor(e){this._container=e,this._presenter=new r(this),this._pushNotificationService=new n,this._indexedDBService=new s,this._map=null,this._marker=null,this._position=null,this._photoBlob=null,this._stream=null}async render(){this._container.innerHTML=`
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
    `,await this._initServices(),this._initMap(),this._initCameraButtons(),this._initForm(),this._initNotificationSection()}async _initServices(){try{await this._indexedDBService.init(),await this._pushNotificationService.init()}catch(e){console.error("Failed to initialize services:",e)}}_initMap(){this._map=L.map("map").setView([0,0],2),L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(this._map),this._map.on("click",e=>{this._position={lat:e.latlng.lat,lon:e.latlng.lng},document.getElementById("location-display").textContent=`Location: ${this._position.lat.toFixed(4)}, ${this._position.lon.toFixed(4)}`,this._marker?this._marker.setLatLng(e.latlng):this._marker=L.marker(e.latlng).addTo(this._map),this._updateSubmitButton()})}_initCameraButtons(){let e=document.getElementById("start-camera"),t=document.getElementById("capture-photo"),i=document.getElementById("stop-camera"),o=document.getElementById("video"),r=document.getElementById("canvas"),s=document.getElementById("preview");e.addEventListener("click",async()=>{try{this._stream=await navigator.mediaDevices.getUserMedia({video:!0,audio:!1}),o.srcObject=this._stream,e.disabled=!0,t.disabled=!1,i.disabled=!1}catch(e){console.error("Error accessing camera:",e),this.showError(`Failed to access camera: ${e.message}`)}}),t.addEventListener("click",()=>{r.width=o.videoWidth,r.height=o.videoHeight,r.getContext("2d").drawImage(o,0,0,r.width,r.height),r.toBlob(e=>{this._photoBlob=e,s.src=URL.createObjectURL(e),s.style.display="block",this._updateSubmitButton()},"image/jpeg",.8)}),i.addEventListener("click",()=>{this._stream&&(this._stream.getTracks().forEach(e=>e.stop()),this._stream=null,o.srcObject=null),e.disabled=!1,t.disabled=!0,i.disabled=!0})}_initForm(){document.getElementById("add-story-form").addEventListener("submit",async e=>{e.preventDefault();let t=document.getElementById("description").value;try{navigator.onLine?(await this._presenter.addStory(t,this._photoBlob,this._position?.lat,this._position?.lon),await this._sendStoryNotification(t)):(await this._saveOfflineStory(t),this.showSuccess("Story saved offline. It will be uploaded when you're back online.")),this._stream&&this._stream.getTracks().forEach(e=>e.stop()),setTimeout(()=>{window.location.hash="#/home"},2e3)}catch(e){console.error(e)}})}async _saveOfflineStory(e){try{if(await this._indexedDBService.addOfflineStory(e,this._photoBlob,this._position?.lat,this._position?.lon),"serviceWorker"in navigator&&"sync"in window.ServiceWorkerRegistration.prototype){let e=await navigator.serviceWorker.ready;await e.sync.register("background-sync-story")}}catch(e){throw console.error("Failed to save offline story:",e),Error("Failed to save story offline")}}async _sendStoryNotification(e){try{(await this._pushNotificationService.getSubscriptionStatus()).isSubscribed&&console.log("Story created, push notification will be sent by server")}catch(e){console.error("Failed to handle push notification:",e)}}async _initNotificationSection(){let e=document.getElementById("notification-status"),t=document.getElementById("enable-notifications"),i=document.getElementById("disable-notifications");try{(await this._pushNotificationService.getSubscriptionStatus()).isSubscribed?(e.innerHTML='<p class="alert alert-success">✅ Push notifications are enabled</p>',i.style.display="inline-block",t.style.display="none"):(e.innerHTML='<p class="alert alert-info">\uD83D\uDD14 Enable push notifications to get notified when your stories are published</p>',t.style.display="inline-block",i.style.display="none")}catch(o){e.innerHTML='<p class="alert alert-warning">⚠️ Push notifications are not supported in this browser</p>',t.style.display="none",i.style.display="none"}t.addEventListener("click",async()=>{try{await this._pushNotificationService.subscribe(),await this._initNotificationSection(),this.showSuccess("Push notifications enabled successfully!")}catch(e){console.error("Failed to enable notifications:",e),this.showError("Failed to enable push notifications")}}),i.addEventListener("click",async()=>{try{await this._pushNotificationService.unsubscribe(),await this._initNotificationSection(),this.showSuccess("Push notifications disabled successfully!")}catch(e){console.error("Failed to disable notifications:",e),this.showError("Failed to disable push notifications")}})}_updateSubmitButton(){document.getElementById("submit-button").disabled=!this._photoBlob}showLoading(){let e=document.getElementById("submit-button");e.textContent="Adding Story...",e.disabled=!0}hideLoading(){let e=document.getElementById("submit-button");e.textContent="Add Story",e.disabled=!this._photoBlob}showError(e){document.getElementById("alert-container").innerHTML=`
      <div class="alert alert-danger">
        ${e}
      </div>
    `}showSuccess(e){document.getElementById("alert-container").innerHTML=`
      <div class="alert alert-success">
        ${e}
      </div>
    `}},c=class{constructor(){this._apiService=new i,this._authService=new t}async login(e,t){return await this._apiService.login(e,t)}async register(e,t,i){return await this._apiService.register(e,t,i)}isLoggedIn(){return this._authService.isLoggedIn()}logout(){this._authService.logout()}},d=class extends e{constructor(e){super(e),this._authModel=new c}async login(e,t){try{this._view.showLoading();let i=await this._authModel.login(e,t);return this._view.showSuccess("Login successful. Redirecting to home page..."),i}catch(e){throw this._view.showError(e.message),e}finally{this._view.hideLoading()}}async register(e,t,i){try{this._view.showLoading();let o=await this._authModel.register(e,t,i);return this._view.showSuccess("Registration successful. Please login with your new account."),o}catch(e){throw this._view.showError(e.message),e}finally{this._view.hideLoading()}}isLoggedIn(){return this._authModel.isLoggedIn()}logout(){this._authModel.logout()}};const h={"/":a,"/home":a,"/add":l,"/login":class{constructor(e){this._container=e,this._presenter=new d(this)}async render(){this._container.innerHTML=`
      <section class="page form-container" role="region" aria-labelledby="login-title">
        <h2 id="login-title">Login</h2>
        <div id="alert-container" role="alert" aria-live="assertive"></div>
        <form id="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>
          </div>
          <button type="submit" id="submit-button">Login</button>
        </form>
        <p>Don't have an account? <a href="#/register">Register here</a></p>
      </section>
    `,this._initLoginForm()}_initLoginForm(){document.getElementById("login-form").addEventListener("submit",async e=>{e.preventDefault();let t=document.getElementById("email").value,i=document.getElementById("password").value;try{await this._presenter.login(t,i),setTimeout(()=>{window.location.hash="#/home"},1e3)}catch(e){console.error(e)}})}showLoading(){let e=document.getElementById("submit-button");e.textContent="Logging in...",e.disabled=!0}hideLoading(){let e=document.getElementById("submit-button");e.textContent="Login",e.disabled=!1}showError(e){document.getElementById("alert-container").innerHTML=`
      <div class="alert alert-danger">
        ${e}
      </div>
    `}showSuccess(e){document.getElementById("alert-container").innerHTML=`
      <div class="alert alert-success">
        ${e}
      </div>
    `}},"/register":class{constructor(e){this._container=e,this._presenter=new d(this)}async render(){this._container.innerHTML=`
      <section class="page form-container" role="region" aria-labelledby="register-title">
        <h2 id="register-title">Register</h2>
        <div id="alert-container" role="alert" aria-live="assertive"></div>
        <form id="register-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password (min 8 characters)</label>
            <input type="password" id="password" name="password" minlength="8" required>
          </div>
          <button type="submit" id="submit-button">Register</button>
        </form>
        <p>Already have an account? <a href="#/login">Login here</a></p>
      </section>
    `,this._initRegisterForm()}_initRegisterForm(){document.getElementById("register-form").addEventListener("submit",async e=>{e.preventDefault();let t=document.getElementById("name").value,i=document.getElementById("email").value,o=document.getElementById("password").value;try{await this._presenter.register(t,i,o),setTimeout(()=>{window.location.hash="#/login"},2e3)}catch(e){console.error(e)}})}showLoading(){let e=document.getElementById("submit-button");e.textContent="Registering...",e.disabled=!0}hideLoading(){let e=document.getElementById("submit-button");e.textContent="Register",e.disabled=!1}showError(e){document.getElementById("alert-container").innerHTML=`
      <div class="alert alert-danger">
        ${e}
      </div>
    `}showSuccess(e){document.getElementById("alert-container").innerHTML=`
      <div class="alert alert-success">
        ${e}
      </div>
    `}},"/detail/:id":class{constructor(e,t){this._container=e,this._id=t,this._presenter=new r(this),this._indexedDBService=new s,this._story=null,this._map=null}async render(){this._container.innerHTML=`
      <section class="page" role="region" aria-labelledby="detail-title">
        <h2 id="detail-title">Story Detail</h2>
        <div id="loading" role="status" aria-live="polite">Loading story...</div>
        <div id="error-container" role="alert" aria-live="assertive" style="display: none;"></div>
        <div id="story-detail" style="display: none;"></div>
      </section>
    `,await this._initIndexedDB(),await this._fetchStory(),this._renderStory()}async _initIndexedDB(){try{await this._indexedDBService.init()}catch(e){console.error("Failed to initialize IndexedDB:",e)}}async _fetchStory(){try{this._story=await this._presenter.getStoryDetail(this._id)}catch(e){console.error("Error fetching story:",e);try{this._story=await this._indexedDBService.getCachedStory(this._id),this._story&&console.log("Story loaded from cache")}catch(e){console.error("Error loading from cache:",e)}}}async _renderStory(){if(!this._story)return;document.getElementById("loading").style.display="none";let e=document.getElementById("story-detail");e.style.display="block";let t=await this._checkIfFavorite(this._story.id);e.innerHTML=`
      <div class="story-detail">
        <img src="${this._story.photoUrl}" alt="Photo by ${this._story.name}" class="story-img">
        <h3>${this._story.name}</h3>
        <p class="story-date">${this._formatDate(this._story.createdAt)}</p>
        <p class="story-description">${this._story.description}</p>
        <div class="story-actions">
          <button 
            id="favorite-btn" 
            class="favorite-btn ${t?"is-favorite":""}"
            aria-label="${t?"Remove from favorites":"Add to favorites"}"
          >
            ${t?"❤️ Remove from Favorites":"\uD83E\uDD0D Add to Favorites"}
          </button>
        </div>
        ${this._story.lat&&this._story.lon?'<div id="map" aria-label="Map showing story location"></div>':""}
        <a href="#/home">Back to Home</a>
      </div>
    `,this._initFavoriteButton(),this._story.lat&&this._story.lon&&this._initMap()}async _checkIfFavorite(e){try{return await this._indexedDBService.isFavoriteStory(e)}catch(e){return console.error("Failed to check favorite status:",e),!1}}_initFavoriteButton(){let e=document.getElementById("favorite-btn");e.addEventListener("click",async t=>{t.preventDefault();let i=e.classList.contains("is-favorite");try{i?await this._removeFavorite(e):await this._addFavorite(e)}catch(e){console.error("Failed to update favorite:",e),this.showError("Failed to update favorite status")}})}async _addFavorite(e){await this._indexedDBService.addFavoriteStory(this._story),e.classList.add("is-favorite"),e.textContent="❤️ Remove from Favorites",e.setAttribute("aria-label","Remove from favorites"),this.showSuccess("Story added to favorites!")}async _removeFavorite(e){await this._indexedDBService.removeFavoriteStory(this._story.id),e.classList.remove("is-favorite"),e.textContent="\uD83E\uDD0D Add to Favorites",e.setAttribute("aria-label","Add to favorites"),this.showSuccess("Story removed from favorites!")}_initMap(){this._map=L.map("map").setView([this._story.lat,this._story.lon],13),L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(this._map),L.marker([this._story.lat,this._story.lon]).addTo(this._map).bindPopup(`
      <div class="map-popup">
        <img src="${this._story.photoUrl}" alt="Photo by ${this._story.name}">
        <h3>${this._story.name}</h3>
        <p>${this._truncateText(this._story.description,50)}</p>
      </div>
    `).openPopup()}_truncateText(e,t){return e.length<=t?e:e.substring(0,t)+"..."}_formatDate(e){return new Date(e).toLocaleDateString("id-ID",{year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"numeric"})}showLoading(){document.getElementById("loading").style.display="block"}hideLoading(){document.getElementById("loading").style.display="none"}showError(e){document.getElementById("loading").style.display="none";let t=document.getElementById("error-container");t.style.display="block",t.innerHTML=`
      <div class="alert alert-danger">
        ${e}
      </div>
      <a href="#/home">Back to Home</a>
    `}showSuccess(e){let t=document.getElementById("error-container");t.style.display="block",t.innerHTML=`
      <div class="alert alert-success">
        ${e}
      </div>
    `,setTimeout(()=>{t.style.display="none"},3e3)}},"/favorites":class{constructor(e){this._container=e,this._indexedDBService=new s,this._favoriteStories=[]}async render(){this._container.innerHTML=`
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
    `,await this._initIndexedDB(),await this._loadFavoriteStories(),this._renderFavoriteStories(),this._initBulkActions()}async _initIndexedDB(){try{await this._indexedDBService.init()}catch(e){console.error("Failed to initialize IndexedDB:",e),this.showError("Failed to load favorites. Please try refreshing the page.")}}async _loadFavoriteStories(){try{this._favoriteStories=await this._indexedDBService.getFavoriteStories(),console.log("Loaded favorite stories:",this._favoriteStories.length)}catch(e){console.error("Failed to load favorite stories:",e),this.showError("Failed to load favorite stories.")}}_renderFavoriteStories(){let e=document.getElementById("loading"),t=document.getElementById("favorites-list"),i=document.getElementById("empty-state"),o=document.getElementById("bulk-actions");if(e.style.display="none",0===this._favoriteStories.length){i.style.display="block",t.style.display="none",o.style.display="none";return}i.style.display="none",t.style.display="grid",o.style.display="block",t.innerHTML=this._favoriteStories.sort((e,t)=>new Date(t.favoriteAt)-new Date(e.favoriteAt)).map(e=>`
      <article class="story-item">
        <img src="${e.photoUrl}" alt="Photo by ${e.name}" class="story-img">
        <div class="story-content">
          <h3>${e.name}</h3>
          <p class="story-description">${this._truncateText(e.description,100)}</p>
          <p class="story-date">Added to favorites: ${this._formatDate(e.favoriteAt)}</p>
          <div class="story-actions">
            <a href="#/detail/${e.id}" class="story-link">Read more</a>
            <button 
              class="remove-favorite-btn" 
              data-story-id="${e.id}"
              aria-label="Remove ${e.name} from favorites"
            >
              Remove from Favorites
            </button>
          </div>
        </div>
      </article>
    `).join(""),this._initRemoveFavoriteButtons()}_initRemoveFavoriteButtons(){document.querySelectorAll(".remove-favorite-btn").forEach(e=>{e.addEventListener("click",async t=>{t.preventDefault();let i=e.dataset.storyId;await this._removeFavoriteStory(i)})})}_initBulkActions(){document.getElementById("clear-all-favorites").addEventListener("click",async()=>{confirm("Are you sure you want to remove all favorite stories?")&&await this._clearAllFavorites()})}async _removeFavoriteStory(e){try{await this._indexedDBService.removeFavoriteStory(e),this._favoriteStories=this._favoriteStories.filter(t=>t.id!==e),this._renderFavoriteStories(),this.showSuccess("Story removed from favorites")}catch(e){console.error("Failed to remove favorite story:",e),this.showError("Failed to remove story from favorites")}}async _clearAllFavorites(){try{for(let e of this._favoriteStories)await this._indexedDBService.removeFavoriteStory(e.id);this._favoriteStories=[],this._renderFavoriteStories(),this.showSuccess("All favorite stories removed")}catch(e){console.error("Failed to clear all favorites:",e),this.showError("Failed to clear favorite stories")}}_truncateText(e,t){return e.length<=t?e:e.substring(0,t)+"..."}_formatDate(e){return new Date(e).toLocaleDateString("id-ID",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}showLoading(){let e=document.getElementById("loading");e&&(e.style.display="block")}hideLoading(){let e=document.getElementById("loading");e&&(e.style.display="none")}showError(e){let t=document.getElementById("error-container");t&&(t.style.display="block",t.innerHTML=`
        <div class="alert alert-danger">
          ${e}
        </div>
      `)}showSuccess(e){let t=document.getElementById("error-container");t&&(t.style.display="block",t.innerHTML=`
        <div class="alert alert-success">
          ${e}
        </div>
      `,setTimeout(()=>{t.style.display="none"},3e3))}}};var u={};u=import.meta.resolve("czWhb");class y{constructor(){this._content=document.getElementById("main-content"),this._loginMenu=document.getElementById("loginMenu"),this._authService=new t,this._pushNotificationService=new n,this._indexedDBService=new s,this._initApp()}async _initApp(){await this._registerServiceWorker(),await this._initServices(),this._updateAuthMenu(),window.addEventListener("hashchange",()=>{this._renderPage()}),this._renderPage()}async _registerServiceWorker(){if("serviceWorker"in navigator)try{let e=await navigator.serviceWorker.register(u);console.log("Service Worker registered successfully:",e),e.addEventListener("updatefound",()=>{let t=e.installing;t.addEventListener("statechange",()=>{"installed"===t.state&&navigator.serviceWorker.controller&&this._showUpdateNotification()})})}catch(e){console.error("Service Worker registration failed:",e)}}async _initServices(){try{await this._indexedDBService.init(),this._authService.isLoggedIn()&&await this._pushNotificationService.init(),this._setupInstallPrompt(),this._setupOfflineDetection()}catch(e){console.error("Failed to initialize services:",e)}}_setupInstallPrompt(){let e;window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),e=t,this._showInstallPrompt(e)}),window.addEventListener("appinstalled",()=>{console.log("PWA was installed"),this._hideInstallPrompt()})}_showInstallPrompt(e){let t=document.createElement("div");t.className="install-prompt",t.id="install-prompt",t.innerHTML=`
      <p>\u{1F4F1} Install Dicoding Story App for a better experience!</p>
      <button id="install-app">Install</button>
      <button id="dismiss-install">Later</button>
    `,document.body.appendChild(t),document.getElementById("install-app").addEventListener("click",async()=>{e.prompt();let{outcome:t}=await e.userChoice;console.log(`User response to the install prompt: ${t}`),e=null,this._hideInstallPrompt()}),document.getElementById("dismiss-install").addEventListener("click",()=>{this._hideInstallPrompt()})}_hideInstallPrompt(){let e=document.getElementById("install-prompt");e&&e.remove()}_setupOfflineDetection(){let e=()=>{if(!document.getElementById("offline-indicator")){let e=document.createElement("div");e.id="offline-indicator",e.className="offline-indicator",e.textContent="\uD83D\uDCF6 You are offline. Some features may be limited.",document.body.appendChild(e)}};window.addEventListener("online",()=>{let e=document.getElementById("offline-indicator");e&&e.remove()}),window.addEventListener("offline",e),navigator.onLine||e()}_showUpdateNotification(){let e=document.createElement("div");e.className="update-banner",e.innerHTML=`
      <div class="alert alert-info">
        <p>A new version is available! 
        <button id="refresh-app">Refresh to update</button>
        <button id="dismiss-update">Dismiss</button></p>
      </div>
    `,document.body.insertBefore(e,document.body.firstChild),document.getElementById("refresh-app").addEventListener("click",()=>{window.location.reload()}),document.getElementById("dismiss-update").addEventListener("click",()=>{e.remove()})}_updateAuthMenu(){let e=this._authService.isLoggedIn(),t=this._authService.getUserName();if(e){this._loginMenu.textContent=`Logout (${t||"User"})`,this._loginMenu.href="#/home",this._loginMenu.setAttribute("aria-label","Logout from your account");let e=this._loginMenu.cloneNode(!0);this._loginMenu.parentNode.replaceChild(e,this._loginMenu),this._loginMenu=e,this._loginMenu.addEventListener("click",e=>{e.preventDefault(),this._authService.logout(),this._updateAuthMenu(),window.location.hash="#/home"})}else{this._loginMenu.textContent="Login",this._loginMenu.href="#/login",this._loginMenu.setAttribute("aria-label","Go to login page");let e=this._loginMenu.cloneNode(!0);this._loginMenu.parentNode.replaceChild(e,this._loginMenu),this._loginMenu=e}}async _renderPage(){document.startViewTransition?document.startViewTransition(()=>this._updateDOM()):this._updateDOM()}async _updateDOM(){let e=window.location.hash.slice(1).toLowerCase()||"/",t=this._parseActiveUrl(e),i=this._getPage(t);try{if(this._content.innerHTML="",this._routeRequiresAuth(t.resource)&&!this._authService.isLoggedIn()){window.location.hash="#/login";return}let e=new i(this._content,t.id);await e.render(),this._updateAuthMenu(),this._content.focus()}catch(e){console.error("Error rendering page:",e),this._showErrorPage(e)}}_showErrorPage(e){this._content.innerHTML=`
      <section class="page error-page" role="alert">
        <h2>Oops! Something went wrong</h2>
        <p>${e.message||"Unknown error occurred"}</p>
        <a href="#/home" class="btn">Back to Home</a>
      </section>
    `}_parseActiveUrl(e){let t=e.split("/");return{resource:`/${t[1]||""}`,id:t[2]||null}}_getPage(e){let t;if(e.id){let i=Object.keys(h).find(e=>e.includes("/:id"));if(i){let o=i.replace("/:id","");e.resource===o&&(t=h[i])}}else t=h[e.resource];return t||h["/"]}_routeRequiresAuth(e){return["/add"].includes(e)}}document.addEventListener("DOMContentLoaded",()=>{new y});
//# sourceMappingURL=dicoding-story.32aca21f.js.map
