// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  function $parcel$resolve(url) {  url = importMap[url] || url;  return import.meta.resolve(distDir + url);}newRequire.resolve = $parcel$resolve;

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"aj62f":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "cb5ea115f72d0d54";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"4ZGjQ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _homePageJs = require("./views/home-page.js");
var _homePageJsDefault = parcelHelpers.interopDefault(_homePageJs);
var _addStoryPageJs = require("./views/add-story-page.js");
var _addStoryPageJsDefault = parcelHelpers.interopDefault(_addStoryPageJs);
var _loginPageJs = require("./views/login-page.js");
var _loginPageJsDefault = parcelHelpers.interopDefault(_loginPageJs);
var _registerPageJs = require("./views/register-page.js");
var _registerPageJsDefault = parcelHelpers.interopDefault(_registerPageJs);
var _detailPageJs = require("./views/detail-page.js");
var _detailPageJsDefault = parcelHelpers.interopDefault(_detailPageJs);
var _favoritesPageJs = require("./views/favorites-page.js");
var _favoritesPageJsDefault = parcelHelpers.interopDefault(_favoritesPageJs);
var _authServiceJs = require("./services/auth-service.js");
var _authServiceJsDefault = parcelHelpers.interopDefault(_authServiceJs);
var _pushNotificationServiceJs = require("./services/push-notification-service.js");
var _pushNotificationServiceJsDefault = parcelHelpers.interopDefault(_pushNotificationServiceJs);
var _indexeddbServiceJs = require("./services/indexeddb-service.js");
var _indexeddbServiceJsDefault = parcelHelpers.interopDefault(_indexeddbServiceJs);
const API_BASE_URL = "https://story-api.dicoding.dev/v1";
const API_ENDPOINTS = {
    register: `${API_BASE_URL}/register`,
    login: `${API_BASE_URL}/login`,
    stories: `${API_BASE_URL}/stories`,
    guestStories: `${API_BASE_URL}/stories/guest`,
    detailStory: (id)=>`${API_BASE_URL}/stories/${id}`,
    subscribe: `${API_BASE_URL}/notifications/subscribe`,
    unsubscribe: `${API_BASE_URL}/notifications/subscribe`
};
const routes = {
    "/": (0, _homePageJsDefault.default),
    "/home": (0, _homePageJsDefault.default),
    "/add": (0, _addStoryPageJsDefault.default),
    "/login": (0, _loginPageJsDefault.default),
    "/register": (0, _registerPageJsDefault.default),
    "/detail/:id": (0, _detailPageJsDefault.default),
    "/favorites": (0, _favoritesPageJsDefault.default)
};
class App {
    constructor(){
        this._content = document.getElementById("main-content");
        this._loginMenu = document.getElementById("loginMenu");
        this._authService = new (0, _authServiceJsDefault.default)();
        this._pushNotificationService = new (0, _pushNotificationServiceJsDefault.default)();
        this._indexedDBService = new (0, _indexeddbServiceJsDefault.default)();
        this._initApp();
    }
    async _initApp() {
        await this._registerServiceWorker();
        await this._initServices();
        this._updateAuthMenu();
        window.addEventListener("hashchange", ()=>{
            this._renderPage();
        });
        this._renderPage();
    }
    async _registerServiceWorker() {
        if ("serviceWorker" in navigator) try {
            const registration = await navigator.serviceWorker.register(require("390fbe0c59aea03f"));
            console.log("Service Worker registered successfully:", registration);
            // Handle service worker updates
            registration.addEventListener("updatefound", ()=>{
                const newWorker = registration.installing;
                newWorker.addEventListener("statechange", ()=>{
                    if (newWorker.state === "installed" && navigator.serviceWorker.controller) // New service worker available
                    this._showUpdateNotification();
                });
            });
        } catch (error) {
            console.error("Service Worker registration failed:", error);
        }
    }
    async _initServices() {
        try {
            // Initialize IndexedDB
            await this._indexedDBService.init();
            // Initialize push notifications if user is logged in
            if (this._authService.isLoggedIn()) await this._pushNotificationService.init();
            // Setup install prompt
            this._setupInstallPrompt();
            // Setup offline/online detection
            this._setupOfflineDetection();
        } catch (error) {
            console.error("Failed to initialize services:", error);
        }
    }
    _setupInstallPrompt() {
        let deferredPrompt;
        window.addEventListener("beforeinstallprompt", (e)=>{
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later
            deferredPrompt = e;
            // Show install button
            this._showInstallPrompt(deferredPrompt);
        });
        window.addEventListener("appinstalled", ()=>{
            console.log("PWA was installed");
            this._hideInstallPrompt();
        });
    }
    _showInstallPrompt(deferredPrompt) {
        const installPrompt = document.createElement("div");
        installPrompt.className = "install-prompt";
        installPrompt.id = "install-prompt";
        installPrompt.innerHTML = `
      <p>\u{1F4F1} Install Dicoding Story App for a better experience!</p>
      <button id="install-app">Install</button>
      <button id="dismiss-install">Later</button>
    `;
        document.body.appendChild(installPrompt);
        document.getElementById("install-app").addEventListener("click", async ()=>{
            // Show the install prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            // Clear the deferred prompt variable
            deferredPrompt = null;
            this._hideInstallPrompt();
        });
        document.getElementById("dismiss-install").addEventListener("click", ()=>{
            this._hideInstallPrompt();
        });
    }
    _hideInstallPrompt() {
        const installPrompt = document.getElementById("install-prompt");
        if (installPrompt) installPrompt.remove();
    }
    _setupOfflineDetection() {
        const showOfflineIndicator = ()=>{
            if (!document.getElementById("offline-indicator")) {
                const indicator = document.createElement("div");
                indicator.id = "offline-indicator";
                indicator.className = "offline-indicator";
                indicator.textContent = "\uD83D\uDCF6 You are offline. Some features may be limited.";
                document.body.appendChild(indicator);
            }
        };
        const hideOfflineIndicator = ()=>{
            const indicator = document.getElementById("offline-indicator");
            if (indicator) indicator.remove();
        };
        window.addEventListener("online", hideOfflineIndicator);
        window.addEventListener("offline", showOfflineIndicator);
        // Check initial state
        if (!navigator.onLine) showOfflineIndicator();
    }
    _showUpdateNotification() {
        // Show a notification that the app has been updated
        const updateBanner = document.createElement("div");
        updateBanner.className = "update-banner";
        updateBanner.innerHTML = `
      <div class="alert alert-info">
        <p>A new version is available! 
        <button id="refresh-app">Refresh to update</button>
        <button id="dismiss-update">Dismiss</button></p>
      </div>
    `;
        document.body.insertBefore(updateBanner, document.body.firstChild);
        document.getElementById("refresh-app").addEventListener("click", ()=>{
            window.location.reload();
        });
        document.getElementById("dismiss-update").addEventListener("click", ()=>{
            updateBanner.remove();
        });
    }
    _updateAuthMenu() {
        const isLoggedIn = this._authService.isLoggedIn();
        const username = this._authService.getUserName();
        if (isLoggedIn) {
            this._loginMenu.textContent = `Logout (${username || "User"})`;
            this._loginMenu.href = "#/home";
            this._loginMenu.setAttribute("aria-label", "Logout from your account");
            const oldClone = this._loginMenu.cloneNode(true);
            this._loginMenu.parentNode.replaceChild(oldClone, this._loginMenu);
            this._loginMenu = oldClone;
            this._loginMenu.addEventListener("click", (e)=>{
                e.preventDefault();
                this._authService.logout();
                this._updateAuthMenu();
                window.location.hash = "#/home";
            });
        } else {
            this._loginMenu.textContent = "Login";
            this._loginMenu.href = "#/login";
            this._loginMenu.setAttribute("aria-label", "Go to login page");
            const oldClone = this._loginMenu.cloneNode(true);
            this._loginMenu.parentNode.replaceChild(oldClone, this._loginMenu);
            this._loginMenu = oldClone;
        }
    }
    async _renderPage() {
        if (document.startViewTransition) document.startViewTransition(()=>this._updateDOM());
        else this._updateDOM();
    }
    async _updateDOM() {
        const hash = window.location.hash.slice(1).toLowerCase() || "/";
        const url = this._parseActiveUrl(hash);
        const page = this._getPage(url);
        try {
            this._content.innerHTML = "";
            if (this._routeRequiresAuth(url.resource) && !this._authService.isLoggedIn()) {
                window.location.hash = "#/login";
                return;
            }
            const view = new page(this._content, url.id);
            await view.render();
            this._updateAuthMenu();
            this._content.focus();
        } catch (error) {
            console.error("Error rendering page:", error);
            this._showErrorPage(error);
        }
    }
    _showErrorPage(error) {
        this._content.innerHTML = `
      <section class="page error-page" role="alert">
        <h2>Oops! Something went wrong</h2>
        <p>${error.message || "Unknown error occurred"}</p>
        <a href="#/home" class="btn">Back to Home</a>
      </section>
    `;
    }
    _parseActiveUrl(url) {
        const splitedUrl = url.split("/");
        return {
            resource: `/${splitedUrl[1] || ""}`,
            id: splitedUrl[2] || null
        };
    }
    _getPage(url) {
        let page;
        if (url.id) {
            const idParameterRoute = Object.keys(routes).find((route)=>route.includes("/:id"));
            if (idParameterRoute) {
                const baseRoute = idParameterRoute.replace("/:id", "");
                if (url.resource === baseRoute) page = routes[idParameterRoute];
            }
        } else page = routes[url.resource];
        return page || routes["/"];
    }
    _routeRequiresAuth(resource) {
        return [
            "/add"
        ].includes(resource);
    }
}
document.addEventListener("DOMContentLoaded", ()=>{
    new App();
});

},{"./views/home-page.js":"36mn2","./views/add-story-page.js":"4dnEW","./views/login-page.js":"drxUQ","./views/register-page.js":"1DYyj","./views/detail-page.js":"47L5i","./views/favorites-page.js":"k1eMW","./services/auth-service.js":"csYQn","./services/push-notification-service.js":"cNxtC","./services/indexeddb-service.js":"lq0yC","390fbe0c59aea03f":"iSs9O","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"36mn2":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _storyPresenterJs = require("../presenters/story-presenter.js");
var _storyPresenterJsDefault = parcelHelpers.interopDefault(_storyPresenterJs);
var _indexeddbServiceJs = require("../services/indexeddb-service.js");
var _indexeddbServiceJsDefault = parcelHelpers.interopDefault(_indexeddbServiceJs);
class HomePage {
    constructor(container){
        this._container = container;
        this._presenter = new (0, _storyPresenterJsDefault.default)(this);
        this._indexedDBService = new (0, _indexeddbServiceJsDefault.default)();
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
        await this._initIndexedDB();
        await this._fetchStories();
        this._initMap();
        this._renderStories();
    }
    async _initIndexedDB() {
        try {
            await this._indexedDBService.init();
        } catch (error) {
            console.error("Failed to initialize IndexedDB:", error);
        }
    }
    async _fetchStories() {
        this._stories = await this._presenter.getStories(1, 10, 1);
    }
    async _renderStories() {
        const storyListElement = document.getElementById("story-list");
        const loadingElement = document.getElementById("loading");
        loadingElement.style.display = "none";
        if (this._stories.length === 0) {
            storyListElement.innerHTML = "<p>No stories found. Please login to see stories or add new ones.</p>";
            return;
        }
        // Cache stories for offline viewing
        for (const story of this._stories)try {
            await this._indexedDBService.cacheStory(story);
        } catch (error) {
            console.error("Failed to cache story:", error);
        }
        storyListElement.innerHTML = await Promise.all(this._stories.map(async (story)=>{
            const isFavorite = await this._checkIfFavorite(story.id);
            return `
      <article class="story-item">
        <img src="${story.photoUrl}" alt="Photo by ${story.name}" class="story-img">
        <div class="story-content">
          <h3>${story.name}</h3>
          <p class="story-description">${this._truncateText(story.description, 100)}</p>
          <p class="story-date">${this._formatDate(story.createdAt)}</p>
          <div class="story-actions">
            <a href="#/detail/${story.id}" class="story-link">Read more</a>
            <button 
              class="favorite-btn ${isFavorite ? "is-favorite" : ""}" 
              data-story-id="${story.id}"
              aria-label="${isFavorite ? "Remove from favorites" : "Add to favorites"}"
            >
              ${isFavorite ? "\u2764\uFE0F Remove from Favorites" : "\uD83E\uDD0D Add to Favorites"}
            </button>
          </div>
        </div>
      </article>
    `;
        })).then((storyHtmlArray)=>storyHtmlArray.join(""));
        this._initFavoriteButtons();
    }
    async _checkIfFavorite(storyId) {
        try {
            return await this._indexedDBService.isFavoriteStory(storyId);
        } catch (error) {
            console.error("Failed to check favorite status:", error);
            return false;
        }
    }
    _initFavoriteButtons() {
        const favoriteButtons = document.querySelectorAll(".favorite-btn");
        favoriteButtons.forEach((button)=>{
            button.addEventListener("click", async (e)=>{
                e.preventDefault();
                const storyId = button.dataset.storyId;
                const isFavorite = button.classList.contains("is-favorite");
                try {
                    if (isFavorite) await this._removeFavorite(storyId, button);
                    else await this._addFavorite(storyId, button);
                } catch (error) {
                    console.error("Failed to update favorite:", error);
                    this.showError("Failed to update favorite status");
                }
            });
        });
    }
    async _addFavorite(storyId, button) {
        const story = this._stories.find((s)=>s.id === storyId);
        if (!story) return;
        await this._indexedDBService.addFavoriteStory(story);
        button.classList.add("is-favorite");
        button.textContent = "\u2764\uFE0F Remove from Favorites";
        button.setAttribute("aria-label", "Remove from favorites");
        this.showSuccess("Story added to favorites!");
    }
    async _removeFavorite(storyId, button) {
        await this._indexedDBService.removeFavoriteStory(storyId);
        button.classList.remove("is-favorite");
        button.textContent = "\uD83E\uDD0D Add to Favorites";
        button.setAttribute("aria-label", "Add to favorites");
        this.showSuccess("Story removed from favorites!");
    }
    _initMap() {
        this._map = L.map("map").setView([
            0,
            0
        ], 2);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this._map);
        this._stories.forEach((story)=>{
            if (story.lat && story.lon) {
                const marker = L.marker([
                    story.lat,
                    story.lon
                ]).addTo(this._map);
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
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric"
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
        const errorContainer = document.getElementById("error-container");
        errorContainer.style.display = "block";
        errorContainer.innerHTML = `
      <div class="alert alert-danger">
        ${message}
      </div>
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
        setTimeout(()=>{
            errorContainer.style.display = "none";
        }, 3000);
    }
}
exports.default = HomePage;

},{"../presenters/story-presenter.js":"3A6V0","../services/indexeddb-service.js":"lq0yC","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"3A6V0":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _basePresenterJs = require("./base-presenter.js");
var _basePresenterJsDefault = parcelHelpers.interopDefault(_basePresenterJs);
var _storyModelJs = require("../models/story-model.js"); // Impor StoryModel
var _storyModelJsDefault = parcelHelpers.interopDefault(_storyModelJs);
class StoryPresenter extends (0, _basePresenterJsDefault.default) {
    constructor(view){
        super(view);
        this._storyModel = new (0, _storyModelJsDefault.default)(); // Gunakan StoryModel
    }
    async getStories(page = 1, size = 10, location = 1) {
        try {
            this._view.showLoading();
            const stories = await this._storyModel.getStories(page, size, location);
            return stories;
        } catch (error) {
            this._view.showError(`Failed to load stories: ${error.message}`);
            return [];
        } finally{
            this._view.hideLoading();
        }
    }
    async getStoryDetail(id) {
        try {
            this._view.showLoading();
            const story = await this._storyModel.getStoryDetail(id);
            return story;
        } catch (error) {
            this._view.showError(`Failed to load story: ${error.message}`);
            throw error;
        } finally{
            this._view.hideLoading();
        }
    }
    async addStory(description, photoBlob, lat, lon) {
        try {
            this._view.showLoading();
            const result = await this._storyModel.addStory(description, photoBlob, lat, lon);
            this._view.showSuccess("Story added successfully. Redirecting to home page...");
            return result;
        } catch (error) {
            this._view.showError(`Failed to add story: ${error.message}`);
            throw error;
        } finally{
            this._view.hideLoading();
        }
    }
}
exports.default = StoryPresenter;

},{"./base-presenter.js":"vnJV0","../models/story-model.js":"88V2Z","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"vnJV0":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class BasePresenter {
    constructor(view){
        this._view = view;
    }
    init() {}
    handleError(error, defaultMessage = "An error occurred") {
        const message = error.message || defaultMessage;
        if (this._view && typeof this._view.showError === "function") this._view.showError(message);
        console.error("Presenter error:", error);
        return message;
    }
}
exports.default = BasePresenter;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"88V2Z":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _apiServiceJs = require("../services/api-service.js");
var _apiServiceJsDefault = parcelHelpers.interopDefault(_apiServiceJs);
class StoryModel {
    constructor(){
        this._apiService = new (0, _apiServiceJsDefault.default)();
    }
    async getStories(page = 1, size = 10, location = 1) {
        const stories = await this._apiService.getStories(page, size, location);
        return stories;
    }
    async getStoryDetail(id) {
        const story = await this._apiService.getStoryDetail(id);
        return story;
    }
    async addStory(description, photoBlob, lat, lon) {
        const result = await this._apiService.addStory(description, photoBlob, lat, lon);
        return result;
    }
}
exports.default = StoryModel;

},{"../services/api-service.js":"9ArQ4","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"9ArQ4":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _authServiceJs = require("./auth-service.js");
var _authServiceJsDefault = parcelHelpers.interopDefault(_authServiceJs);
class ApiService {
    constructor(){
        this._baseUrl = "https://story-api.dicoding.dev/v1";
        this._authService = new (0, _authServiceJsDefault.default)();
    }
    _getAuthHeader() {
        const token = this._authService.getToken();
        console.log("Auth token: " + token);
        return token ? {
            Authorization: `Bearer ${token}`
        } : {};
    }
    async register(name, email, password) {
        try {
            const response = await fetch(`${this._baseUrl}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });
            const responseJson = await response.json();
            if (responseJson.error) throw new Error(responseJson.message);
            return responseJson;
        } catch (error) {
            throw new Error(`Register failed: ${error.message}`);
        }
    }
    async login(email, password) {
        try {
            const response = await fetch(`${this._baseUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const responseJson = await response.json();
            if (responseJson.error) throw new Error(responseJson.message);
            this._authService.setAuth({
                token: responseJson.loginResult.token,
                name: responseJson.loginResult.name,
                userId: responseJson.loginResult.userId
            });
            return responseJson;
        } catch (error) {
            throw new Error(`Login failed: ${error.message}`);
        }
    }
    async getStories(page = 1, size = 10, location = 1) {
        try {
            const url = new URL(`${this._baseUrl}/stories`);
            url.searchParams.append("page", page);
            url.searchParams.append("size", size);
            url.searchParams.append("location", location);
            const response = await fetch(url, {
                headers: this._getAuthHeader()
            });
            const responseJson = await response.json();
            if (responseJson.error) throw new Error(responseJson.message);
            return responseJson.listStory;
        } catch (error) {
            if (!this._authService.isLoggedIn()) return this._getStoriesAsGuest();
            throw new Error(`Failed to get stories: ${error.message}`);
        }
    }
    async _getStoriesAsGuest() {
        try {
            return [];
        } catch (error) {
            throw new Error(`Failed to get stories as guest: ${error.message}`);
        }
    }
    async getStoryDetail(id) {
        try {
            const response = await fetch(`${this._baseUrl}/stories/${id}`, {
                headers: this._getAuthHeader()
            });
            const responseJson = await response.json();
            if (responseJson.error) throw new Error(responseJson.message);
            return responseJson.story;
        } catch (error) {
            throw new Error(`Failed to get story detail: ${error.message}`);
        }
    }
    async addStory(description, photoBlob, lat, lon) {
        try {
            const formData = new FormData();
            formData.append("description", description);
            formData.append("photo", photoBlob);
            if (lat && lon) {
                formData.append("lat", lat);
                formData.append("lon", lon);
            }
            const endpoint = this._authService.isLoggedIn() ? `${this._baseUrl}/stories` : `${this._baseUrl}/stories/guest`;
            const headers = this._authService.isLoggedIn() ? this._getAuthHeader() : {};
            const response = await fetch(endpoint, {
                method: "POST",
                headers,
                body: formData
            });
            const responseJson = await response.json();
            if (responseJson.error) throw new Error(responseJson.message);
            return responseJson;
        } catch (error) {
            throw new Error(`Failed to add story: ${error.message}`);
        }
    }
}
exports.default = ApiService;

},{"./auth-service.js":"csYQn","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"csYQn":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class AuthService {
    constructor(){
        this._storageKey = "dicodingStoryAuth";
    }
    setAuth(data) {
        localStorage.setItem(this._storageKey, JSON.stringify(data));
    }
    getAuth() {
        const data = localStorage.getItem(this._storageKey);
        return data ? JSON.parse(data) : null;
    }
    isLoggedIn() {
        return !!this.getAuth();
    }
    getToken() {
        const auth = this.getAuth();
        return auth ? auth.token : null;
    }
    getUserName() {
        const auth = this.getAuth();
        return auth ? auth.name : null;
    }
    logout() {
        localStorage.removeItem(this._storageKey);
    }
}
exports.default = AuthService;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"lq0yC":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class IndexedDBService {
    constructor(){
        this.dbName = "dicoding-story-db";
        this.dbVersion = 1;
        this.db = null;
    }
    async init() {
        return new Promise((resolve, reject)=>{
            const request = indexedDB.open(this.dbName, this.dbVersion);
            request.onerror = ()=>{
                console.error("Failed to open IndexedDB:", request.error);
                reject(request.error);
            };
            request.onsuccess = ()=>{
                this.db = request.result;
                console.log("IndexedDB opened successfully");
                resolve(this.db);
            };
            request.onupgradeneeded = (event)=>{
                this.db = event.target.result;
                this.createObjectStores();
            };
        });
    }
    createObjectStores() {
        // Store for favorite stories
        if (!this.db.objectStoreNames.contains("favorite-stories")) {
            const favoriteStore = this.db.createObjectStore("favorite-stories", {
                keyPath: "id"
            });
            favoriteStore.createIndex("createdAt", "createdAt", {
                unique: false
            });
        }
        // Store for offline stories (pending upload)
        if (!this.db.objectStoreNames.contains("offline-stories")) {
            const offlineStore = this.db.createObjectStore("offline-stories", {
                keyPath: "id",
                autoIncrement: true
            });
            offlineStore.createIndex("timestamp", "timestamp", {
                unique: false
            });
        }
        // Store for cached stories for offline viewing
        if (!this.db.objectStoreNames.contains("cached-stories")) {
            const cachedStore = this.db.createObjectStore("cached-stories", {
                keyPath: "id"
            });
            cachedStore.createIndex("cachedAt", "cachedAt", {
                unique: false
            });
        }
        console.log("Object stores created successfully");
    }
    // Favorite Stories Operations
    async addFavoriteStory(story) {
        try {
            const transaction = this.db.transaction([
                "favorite-stories"
            ], "readwrite");
            const store = transaction.objectStore("favorite-stories");
            const favoriteStory = {
                ...story,
                favoriteAt: new Date().toISOString()
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
            const transaction = this.db.transaction([
                "favorite-stories"
            ], "readwrite");
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
            const transaction = this.db.transaction([
                "favorite-stories"
            ], "readonly");
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
            const transaction = this.db.transaction([
                "favorite-stories"
            ], "readonly");
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
            const transaction = this.db.transaction([
                "offline-stories"
            ], "readwrite");
            const store = transaction.objectStore("offline-stories");
            const offlineStory = {
                description,
                photoBlob,
                lat,
                lon,
                timestamp: new Date().toISOString(),
                synced: false
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
            const transaction = this.db.transaction([
                "offline-stories"
            ], "readonly");
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
            const transaction = this.db.transaction([
                "offline-stories"
            ], "readwrite");
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
            const transaction = this.db.transaction([
                "cached-stories"
            ], "readwrite");
            const store = transaction.objectStore("cached-stories");
            const cachedStory = {
                ...story,
                cachedAt: new Date().toISOString()
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
            const transaction = this.db.transaction([
                "cached-stories"
            ], "readonly");
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
            const transaction = this.db.transaction([
                "cached-stories"
            ], "readonly");
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
            const transaction = this.db.transaction([
                "cached-stories"
            ], "readwrite");
            const store = transaction.objectStore("cached-stories");
            const index = store.index("cachedAt");
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            const range = IDBKeyRange.upperBound(sevenDaysAgo.toISOString());
            const request = index.openCursor(range);
            return new Promise((resolve, reject)=>{
                request.onsuccess = (event)=>{
                    const cursor = event.target.result;
                    if (cursor) {
                        cursor.delete();
                        cursor.continue();
                    } else {
                        console.log("Old cached stories cleared");
                        resolve();
                    }
                };
                request.onerror = ()=>reject(request.error);
            });
        } catch (error) {
            console.error("Failed to clear old cached stories:", error);
        }
    }
    // Utility method to execute transactions
    executeTransaction(request) {
        return new Promise((resolve, reject)=>{
            request.onsuccess = ()=>resolve(request.result);
            request.onerror = ()=>reject(request.error);
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
exports.default = IndexedDBService;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"4dnEW":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _storyPresenterJs = require("../presenters/story-presenter.js");
var _storyPresenterJsDefault = parcelHelpers.interopDefault(_storyPresenterJs);
var _pushNotificationServiceJs = require("../services/push-notification-service.js");
var _pushNotificationServiceJsDefault = parcelHelpers.interopDefault(_pushNotificationServiceJs);
var _indexeddbServiceJs = require("../services/indexeddb-service.js");
var _indexeddbServiceJsDefault = parcelHelpers.interopDefault(_indexeddbServiceJs);
class AddStoryPage {
    constructor(container){
        this._container = container;
        this._presenter = new (0, _storyPresenterJsDefault.default)(this);
        this._pushNotificationService = new (0, _pushNotificationServiceJsDefault.default)();
        this._indexedDBService = new (0, _indexeddbServiceJsDefault.default)();
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
        this._map = L.map("map").setView([
            0,
            0
        ], 2);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this._map);
        this._map.on("click", (e)=>{
            this._position = {
                lat: e.latlng.lat,
                lon: e.latlng.lng
            };
            document.getElementById("location-display").textContent = `Location: ${this._position.lat.toFixed(4)}, ${this._position.lon.toFixed(4)}`;
            if (this._marker) this._marker.setLatLng(e.latlng);
            else this._marker = L.marker(e.latlng).addTo(this._map);
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
        startCameraButton.addEventListener("click", async ()=>{
            try {
                this._stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false
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
        capturPhotoButton.addEventListener("click", ()=>{
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext("2d");
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob)=>{
                this._photoBlob = blob;
                const url = URL.createObjectURL(blob);
                preview.src = url;
                preview.style.display = "block";
                this._updateSubmitButton();
            }, "image/jpeg", 0.8);
        });
        stopCameraButton.addEventListener("click", ()=>{
            if (this._stream) {
                this._stream.getTracks().forEach((track)=>track.stop());
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
        form.addEventListener("submit", async (e)=>{
            e.preventDefault();
            const description = document.getElementById("description").value;
            try {
                // Check if online
                if (navigator.onLine) {
                    // Use presenter instead of directly calling the API
                    await this._presenter.addStory(description, this._photoBlob, this._position?.lat, this._position?.lon);
                    // Try to send push notification after successful story creation
                    await this._sendStoryNotification(description);
                } else {
                    // Save for offline sync
                    await this._saveOfflineStory(description);
                    this.showSuccess("Story saved offline. It will be uploaded when you're back online.");
                }
                if (this._stream) this._stream.getTracks().forEach((track)=>track.stop());
                setTimeout(()=>{
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
            await this._indexedDBService.addOfflineStory(description, this._photoBlob, this._position?.lat, this._position?.lon);
            // Register for background sync if supported
            if ("serviceWorker" in navigator && "sync" in window.ServiceWorkerRegistration.prototype) {
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
            const status = await this._pushNotificationService.getSubscriptionStatus();
            if (status.isSubscribed) // The server will send the push notification
            console.log("Story created, push notification will be sent by server");
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
                statusElement.innerHTML = '<p class="alert alert-warning">\u26A0\uFE0F Push notifications are not supported in this browser</p>';
                enableButton.style.display = "none";
                disableButton.style.display = "none";
                return;
            }
            const permissionStatus = this._pushNotificationService.getPermissionStatus();
            const status = await this._pushNotificationService.getSubscriptionStatus();
            if (permissionStatus === "denied") {
                statusElement.innerHTML = '<p class="alert alert-error">\uD83D\uDEAB Notifications are blocked. Please enable them in your browser settings.</p>';
                enableButton.style.display = "none";
                disableButton.style.display = "none";
            } else if (status.isSubscribed) {
                statusElement.innerHTML = '<p class="alert alert-success">\u2705 Push notifications are enabled</p>';
                disableButton.style.display = "inline-block";
                enableButton.style.display = "none";
            } else {
                statusElement.innerHTML = '<p class="alert alert-info">\uD83D\uDD14 Enable push notifications to get notified when your stories are published</p>';
                enableButton.style.display = "inline-block";
                disableButton.style.display = "none";
            }
        } catch (error) {
            console.error("Error checking notification status:", error);
            statusElement.innerHTML = '<p class="alert alert-warning">\u26A0\uFE0F Unable to check notification status</p>';
            enableButton.style.display = "none";
            disableButton.style.display = "none";
        }
        enableButton.addEventListener("click", async ()=>{
            try {
                // Show loading state
                enableButton.disabled = true;
                enableButton.textContent = "Enabling...";
                // Check permission first
                const permissionStatus = this._pushNotificationService.getPermissionStatus();
                if (permissionStatus === "denied") throw new Error("Notifications are blocked. Please enable them in your browser settings and try again.");
                await this._pushNotificationService.subscribe();
                await this._initNotificationSection(); // Refresh the section
                this.showSuccess("Push notifications enabled successfully!");
            } catch (error) {
                console.error("Failed to enable notifications:", error);
                // Provide specific error messages
                let errorMessage = "Failed to enable push notifications";
                if (error.message.includes("permission")) errorMessage = "Permission denied. Please allow notifications in your browser and try again.";
                else if (error.message.includes("login")) errorMessage = "Please log in first to enable notifications.";
                else if (error.message.includes("settings")) errorMessage = error.message;
                this.showError(errorMessage);
            } finally{
                // Reset button state
                enableButton.disabled = false;
                enableButton.textContent = "Enable Notifications";
            }
        });
        disableButton.addEventListener("click", async ()=>{
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
exports.default = AddStoryPage;

},{"../presenters/story-presenter.js":"3A6V0","../services/push-notification-service.js":"cNxtC","../services/indexeddb-service.js":"lq0yC","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"cNxtC":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _authServiceJs = require("./auth-service.js");
var _authServiceJsDefault = parcelHelpers.interopDefault(_authServiceJs);
class PushNotificationService {
    constructor(){
        this.authService = new (0, _authServiceJsDefault.default)();
        this.vapidPublicKey = "BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk";
        this.apiBaseUrl = "https://story-api.dicoding.dev/v1";
        this.registration = null;
    }
    async init() {
        try {
            // Check if service worker is supported
            if (!("serviceWorker" in navigator)) throw new Error("Service Worker not supported");
            // Check if push messaging is supported
            if (!("PushManager" in window)) throw new Error("Push messaging not supported");
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
            if (!("Notification" in window)) throw new Error("This browser does not support notifications");
            // Check current permission status
            let permission = Notification.permission;
            if (permission === "default") // Request permission
            permission = await Notification.requestPermission();
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
            if (!this.authService.isLoggedIn()) throw new Error("User must be logged in to subscribe to notifications");
            // Initialize if not already done
            if (!this.registration) await this.init();
            // Request permission explicitly first
            await this.requestPermission();
            // Check if already subscribed
            const existingSubscription = await this.registration.pushManager.getSubscription();
            if (existingSubscription) {
                console.log("Already subscribed to push notifications");
                return existingSubscription;
            }
            // Create new subscription
            const subscription = await this.registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey)
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
            if (!this.registration) await this.init();
            const subscription = await this.registration.pushManager.getSubscription();
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
            if (!this.registration) await this.init();
            const subscription = await this.registration.pushManager.getSubscription();
            return {
                isSubscribed: !!subscription,
                subscription: subscription
            };
        } catch (error) {
            console.error("Failed to get subscription status:", error);
            return {
                isSubscribed: false,
                subscription: null
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
                    auth: this.arrayBufferToBase64(subscription.getKey("auth"))
                }
            };
            const response = await fetch(`${this.apiBaseUrl}/notifications/subscribe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(subscriptionData)
            });
            const responseData = await response.json();
            if (!response.ok || responseData.error) throw new Error(responseData.message || "Failed to subscribe on server");
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
                endpoint: subscription.endpoint
            };
            const response = await fetch(`${this.apiBaseUrl}/notifications/subscribe`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(subscriptionData)
            });
            const responseData = await response.json();
            if (!response.ok || responseData.error) throw new Error(responseData.message || "Failed to unsubscribe on server");
            console.log("Subscription removed from server successfully");
            return responseData;
        } catch (error) {
            console.error("Failed to remove subscription from server:", error);
            throw error;
        }
    }
    // Helper method to convert VAPID key
    urlBase64ToUint8Array(base64String) {
        const padding = "=".repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for(let i = 0; i < rawData.length; ++i)outputArray[i] = rawData.charCodeAt(i);
        return outputArray;
    }
    // Helper method to convert ArrayBuffer to base64
    arrayBufferToBase64(buffer) {
        const bytes = new Uint8Array(buffer);
        let binary = "";
        for(let i = 0; i < bytes.byteLength; i++)binary += String.fromCharCode(bytes[i]);
        return window.btoa(binary);
    }
    // Test notification (for development)
    async sendTestNotification() {
        try {
            if (Notification.permission === "granted") new Notification("Test Notification", {
                body: "This is a test notification from Dicoding Story App",
                icon: "/icons/icon-192x192.png",
                badge: "/icons/icon-72x72.png"
            });
        } catch (error) {
            console.error("Failed to send test notification:", error);
        }
    }
    getPermissionStatus() {
        if (!("Notification" in window)) return "unsupported";
        return Notification.permission;
    }
    isPermissionGranted() {
        return this.getPermissionStatus() === "granted";
    }
}
exports.default = PushNotificationService;

},{"./auth-service.js":"csYQn","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"drxUQ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _authPresenterJs = require("../presenters/auth-presenter.js");
var _authPresenterJsDefault = parcelHelpers.interopDefault(_authPresenterJs);
class LoginPage {
    constructor(container){
        this._container = container;
        this._presenter = new (0, _authPresenterJsDefault.default)(this);
    }
    async render() {
        this._container.innerHTML = `
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
    `;
        this._initLoginForm();
    }
    _initLoginForm() {
        const form = document.getElementById("login-form");
        form.addEventListener("submit", async (e)=>{
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            try {
                await this._presenter.login(email, password);
                setTimeout(()=>{
                    window.location.hash = "#/home";
                }, 1000);
            } catch (error) {
                console.error(error);
            }
        });
    }
    showLoading() {
        const button = document.getElementById("submit-button");
        button.textContent = "Logging in...";
        button.disabled = true;
    }
    hideLoading() {
        const button = document.getElementById("submit-button");
        button.textContent = "Login";
        button.disabled = false;
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
exports.default = LoginPage;

},{"../presenters/auth-presenter.js":"7q4x4","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"7q4x4":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _basePresenterJs = require("./base-presenter.js");
var _basePresenterJsDefault = parcelHelpers.interopDefault(_basePresenterJs);
var _authModelJs = require("../models/auth-model.js"); // Impor AuthModel
var _authModelJsDefault = parcelHelpers.interopDefault(_authModelJs);
class AuthPresenter extends (0, _basePresenterJsDefault.default) {
    constructor(view){
        super(view);
        this._authModel = new (0, _authModelJsDefault.default)(); // Gunakan AuthModel
    }
    async login(email, password) {
        try {
            this._view.showLoading();
            // Panggil metode login dari AuthModel
            const result = await this._authModel.login(email, password);
            this._view.showSuccess("Login successful. Redirecting to home page...");
            return result;
        } catch (error) {
            this._view.showError(error.message);
            throw error;
        } finally{
            this._view.hideLoading();
        }
    }
    async register(name, email, password) {
        try {
            this._view.showLoading();
            // Panggil metode register dari AuthModel
            const result = await this._authModel.register(name, email, password);
            this._view.showSuccess("Registration successful. Please login with your new account.");
            return result;
        } catch (error) {
            this._view.showError(error.message);
            throw error;
        } finally{
            this._view.hideLoading();
        }
    }
    isLoggedIn() {
        return this._authModel.isLoggedIn(); // Gunakan AuthModel
    }
    logout() {
        this._authModel.logout(); // Gunakan AuthModel
    }
}
exports.default = AuthPresenter;

},{"./base-presenter.js":"vnJV0","../models/auth-model.js":"5yBc8","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"5yBc8":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _apiServiceJs = require("../services/api-service.js");
var _apiServiceJsDefault = parcelHelpers.interopDefault(_apiServiceJs);
var _authServiceJs = require("../services/auth-service.js");
var _authServiceJsDefault = parcelHelpers.interopDefault(_authServiceJs);
class AuthModel {
    constructor(){
        this._apiService = new (0, _apiServiceJsDefault.default)();
        this._authService = new (0, _authServiceJsDefault.default)();
    }
    async login(email, password) {
        const result = await this._apiService.login(email, password);
        return result;
    }
    async register(name, email, password) {
        const result = await this._apiService.register(name, email, password);
        return result;
    }
    isLoggedIn() {
        return this._authService.isLoggedIn();
    }
    logout() {
        this._authService.logout();
    }
}
exports.default = AuthModel;

},{"../services/api-service.js":"9ArQ4","../services/auth-service.js":"csYQn","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"1DYyj":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _authPresenterJs = require("../presenters/auth-presenter.js");
var _authPresenterJsDefault = parcelHelpers.interopDefault(_authPresenterJs);
class RegisterPage {
    constructor(container){
        this._container = container;
        this._presenter = new (0, _authPresenterJsDefault.default)(this);
    }
    async render() {
        this._container.innerHTML = `
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
    `;
        this._initRegisterForm();
    }
    _initRegisterForm() {
        const form = document.getElementById("register-form");
        form.addEventListener("submit", async (e)=>{
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            try {
                await this._presenter.register(name, email, password);
                setTimeout(()=>{
                    window.location.hash = "#/login";
                }, 2000);
            } catch (error) {
                console.error(error);
            }
        });
    }
    showLoading() {
        const button = document.getElementById("submit-button");
        button.textContent = "Registering...";
        button.disabled = true;
    }
    hideLoading() {
        const button = document.getElementById("submit-button");
        button.textContent = "Register";
        button.disabled = false;
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
exports.default = RegisterPage;

},{"../presenters/auth-presenter.js":"7q4x4","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"47L5i":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _storyPresenterJs = require("../presenters/story-presenter.js");
var _storyPresenterJsDefault = parcelHelpers.interopDefault(_storyPresenterJs);
var _indexeddbServiceJs = require("../services/indexeddb-service.js");
var _indexeddbServiceJsDefault = parcelHelpers.interopDefault(_indexeddbServiceJs);
class DetailPage {
    constructor(container, id){
        this._container = container;
        this._id = id;
        this._presenter = new (0, _storyPresenterJsDefault.default)(this);
        this._indexedDBService = new (0, _indexeddbServiceJsDefault.default)();
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
            console.error("Failed to initialize IndexedDB:", error);
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
                if (this._story) console.log("Story loaded from cache");
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
        <img src="${this._story.photoUrl}" alt="Photo by ${this._story.name}" class="story-img">
        <h3>${this._story.name}</h3>
        <p class="story-date">${this._formatDate(this._story.createdAt)}</p>
        <p class="story-description">${this._story.description}</p>
        <div class="story-actions">
          <button 
            id="favorite-btn" 
            class="favorite-btn ${isFavorite ? "is-favorite" : ""}"
            aria-label="${isFavorite ? "Remove from favorites" : "Add to favorites"}"
          >
            ${isFavorite ? "\u2764\uFE0F Remove from Favorites" : "\uD83E\uDD0D Add to Favorites"}
          </button>
        </div>
        ${this._story.lat && this._story.lon ? '<div id="map" aria-label="Map showing story location"></div>' : ""}
        <a href="#/home">Back to Home</a>
      </div>
    `;
        this._initFavoriteButton();
        if (this._story.lat && this._story.lon) this._initMap();
    }
    async _checkIfFavorite(storyId) {
        try {
            return await this._indexedDBService.isFavoriteStory(storyId);
        } catch (error) {
            console.error("Failed to check favorite status:", error);
            return false;
        }
    }
    _initFavoriteButton() {
        const favoriteButton = document.getElementById("favorite-btn");
        favoriteButton.addEventListener("click", async (e)=>{
            e.preventDefault();
            const isFavorite = favoriteButton.classList.contains("is-favorite");
            try {
                if (isFavorite) await this._removeFavorite(favoriteButton);
                else await this._addFavorite(favoriteButton);
            } catch (error) {
                console.error("Failed to update favorite:", error);
                this.showError("Failed to update favorite status");
            }
        });
    }
    async _addFavorite(button) {
        await this._indexedDBService.addFavoriteStory(this._story);
        button.classList.add("is-favorite");
        button.textContent = "\u2764\uFE0F Remove from Favorites";
        button.setAttribute("aria-label", "Remove from favorites");
        this.showSuccess("Story added to favorites!");
    }
    async _removeFavorite(button) {
        await this._indexedDBService.removeFavoriteStory(this._story.id);
        button.classList.remove("is-favorite");
        button.textContent = "\uD83E\uDD0D Add to Favorites";
        button.setAttribute("aria-label", "Add to favorites");
        this.showSuccess("Story removed from favorites!");
    }
    _initMap() {
        this._map = L.map("map").setView([
            this._story.lat,
            this._story.lon
        ], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this._map);
        const marker = L.marker([
            this._story.lat,
            this._story.lon
        ]).addTo(this._map);
        marker.bindPopup(`
      <div class="map-popup">
        <img src="${this._story.photoUrl}" alt="Photo by ${this._story.name}">
        <h3>${this._story.name}</h3>
        <p>${this._truncateText(this._story.description, 50)}</p>
      </div>
    `).openPopup();
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
            minute: "numeric"
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
        setTimeout(()=>{
            errorContainer.style.display = "none";
        }, 3000);
    }
}
exports.default = DetailPage;

},{"../presenters/story-presenter.js":"3A6V0","../services/indexeddb-service.js":"lq0yC","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"k1eMW":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexeddbServiceJs = require("../services/indexeddb-service.js");
var _indexeddbServiceJsDefault = parcelHelpers.interopDefault(_indexeddbServiceJs);
class FavoritesPage {
    constructor(container){
        this._container = container;
        this._indexedDBService = new (0, _indexeddbServiceJsDefault.default)();
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
            this.showError("Failed to load favorites. Please try refreshing the page.");
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
        favoritesListElement.innerHTML = this._favoriteStories.sort((a, b)=>new Date(b.favoriteAt) - new Date(a.favoriteAt)).map((story)=>`
      <article class="story-item">
        <img src="${story.photoUrl}" alt="Photo by ${story.name}" class="story-img">
        <div class="story-content">
          <h3>${story.name}</h3>
          <p class="story-description">${this._truncateText(story.description, 100)}</p>
          <p class="story-date">Added to favorites: ${this._formatDate(story.favoriteAt)}</p>
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
    `).join("");
        this._initRemoveFavoriteButtons();
    }
    _initRemoveFavoriteButtons() {
        const removeButtons = document.querySelectorAll(".remove-favorite-btn");
        removeButtons.forEach((button)=>{
            button.addEventListener("click", async (e)=>{
                e.preventDefault();
                const storyId = button.dataset.storyId;
                await this._removeFavoriteStory(storyId);
            });
        });
    }
    _initBulkActions() {
        const clearAllButton = document.getElementById("clear-all-favorites");
        clearAllButton.addEventListener("click", async ()=>{
            const confirmed = confirm("Are you sure you want to remove all favorite stories?");
            if (confirmed) await this._clearAllFavorites();
        });
    }
    async _removeFavoriteStory(storyId) {
        try {
            await this._indexedDBService.removeFavoriteStory(storyId);
            // Remove from local array
            this._favoriteStories = this._favoriteStories.filter((story)=>story.id !== storyId);
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
            for (const story of this._favoriteStories)await this._indexedDBService.removeFavoriteStory(story.id);
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
            minute: "2-digit"
        };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    }
    showLoading() {
        const loadingElement = document.getElementById("loading");
        if (loadingElement) loadingElement.style.display = "block";
    }
    hideLoading() {
        const loadingElement = document.getElementById("loading");
        if (loadingElement) loadingElement.style.display = "none";
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
            setTimeout(()=>{
                errorContainer.style.display = "none";
            }, 3000);
        }
    }
}
exports.default = FavoritesPage;

},{"../services/indexeddb-service.js":"lq0yC","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"iSs9O":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("sw.js");

},{}]},["aj62f","4ZGjQ"], "4ZGjQ", "parcelRequire8745", {}, "./", "/")

//# sourceMappingURL=dicoding-story.f72d0d54.js.map
