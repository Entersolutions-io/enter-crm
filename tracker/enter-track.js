/**
 * Enter CRM - Tracking Snippet
 * Lightweight visitor tracking for Enter CRM platform.
 * Usage: <script src="https://cdn.entercrm.io/track.js" data-key="YOUR_API_KEY"></script>
 */
(function () {
  "use strict";

  var ENDPOINT = "https://api.entercrm.io/v1/events";
  var script =
    document.currentScript ||
    document.querySelector('script[data-key][src*="enter-track"]');
  var API_KEY = script ? script.getAttribute("data-key") : null;

  if (!API_KEY) {
    console.warn("[EnterCRM] Missing data-key attribute.");
    return;
  }

  // Generate or retrieve visitor ID
  function getVisitorId() {
    var key = "_enter_vid";
    var vid = localStorage.getItem(key);
    if (!vid) {
      vid =
        "v_" +
        Date.now().toString(36) +
        Math.random().toString(36).substring(2, 10);
      localStorage.setItem(key, vid);
    }
    return vid;
  }

  // Generate session ID
  function getSessionId() {
    var key = "_enter_sid";
    var sid = sessionStorage.getItem(key);
    if (!sid) {
      sid =
        "s_" +
        Date.now().toString(36) +
        Math.random().toString(36).substring(2, 10);
      sessionStorage.setItem(key, sid);
    }
    return sid;
  }

  var visitorId = getVisitorId();
  var sessionId = getSessionId();

  // Send event to API
  function send(eventType, data) {
    var payload = JSON.stringify({
      key: API_KEY,
      vid: visitorId,
      sid: sessionId,
      type: eventType,
      url: window.location.href,
      ref: document.referrer || null,
      ts: new Date().toISOString(),
      data: data || {},
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, payload);
    } else {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", ENDPOINT, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(payload);
    }
  }

  // Track page view
  send("pageview", {
    title: document.title,
    path: window.location.pathname,
  });

  // Track time on page
  var startTime = Date.now();
  window.addEventListener("beforeunload", function () {
    send("duration", {
      seconds: Math.round((Date.now() - startTime) / 1000),
      path: window.location.pathname,
    });
  });

  // Public API
  window.EnterCRM = {
    track: function (event, data) {
      send("custom", { event: event, data: data });
    },
    identify: function (email, properties) {
      send("identify", { email: email, properties: properties || {} });
    },
  };
})();
