// content.js — Unread + Yellow ★ (stable insert once, no observers)
(function () {
  // User options (enabled + order) support
  var DEFAULT_SETTINGS = {
    order: ["unread", "yellow", "red", "green", "blue", "purple"],
    enabled: {
      unread: true,
      yellow: true,
      red: true,
      green: true,
      blue: true,
      purple: true,
    },
  };
  var STORAGE_KEY = "betterGmailSidebar";

  var UNREAD_ID = "BVid1";
  var UNREAD_INNER_ID = "BVid2";
  var YELLOW_ID = "YVid1";
  var YELLOW_INNER_ID = "YVid2";
  var RED_ID = "RSid1";
  var RED_INNER_ID = "RSid2";
  var GREEN_ID = "GSid1";
  var GREEN_INNER_ID = "GSid2";
  var BLUE_ID = "BSid1";
  var BLUE_INNER_ID = "BSid2";
  var PURPLE_ID = "PSid1";
  var PURPLE_INNER_ID = "PSid2";

  function listRoot() {
    return document.getElementsByClassName("TK")[0];
  }
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  function isActive(hash) {
    return decodeURIComponent(location.hash || "") === hash;
  }

  // Lightweight debounce helper
  function debounce(fn, wait) {
    var t = null;
    return function () {
      if (t) clearTimeout(t);
      var args = arguments;
      var self = this;
      t = setTimeout(function () {
        fn.apply(self, args);
      }, wait);
    };
  }

  function normalizeSettings(s) {
    var known = DEFAULT_SETTINGS.order.slice();
    var set = new Set(known);
    var order = Array.isArray(s && s.order) ? s.order.filter(function (k) { return set.has(k); }) : known.slice();
    // Ensure all keys appear exactly once
    known.forEach(function (k) { if (order.indexOf(k) === -1) order.push(k); });
    var enabled = Object.assign({}, DEFAULT_SETTINGS.enabled, s && s.enabled);
    return { order: order, enabled: enabled };
  }

  function getSettings() {
    return new Promise(function (resolve) {
      try {
        if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.sync) {
          chrome.storage.sync.get(STORAGE_KEY, function (obj) {
            resolve(normalizeSettings(obj && obj[STORAGE_KEY]));
          });
        } else {
          resolve(DEFAULT_SETTINGS);
        }
      } catch (e) {
        resolve(DEFAULT_SETTINGS);
      }
    });
  }

  // Wait until the sidebar stops changing before inserting (prevents flicker/dupes)
  async function waitForStableTK(
    maxMs = 2000,
    probeEvery = 150,
    stableNeeded = 4
  ) {
    const start = Date.now();
    let lastSig = null,
      stable = 0;
    while (Date.now() - start < maxMs) {
      const root = listRoot();
      if (!root) {
        await sleep(probeEvery);
        continue;
      }
      const labels = Array.from(root.querySelectorAll(".aim .nU"))
        .slice(0, 8)
        .map((s) => (s.textContent || "").trim())
        .join("|");
      const sig = root.childElementCount + ":" + labels;
      if (sig === lastSig) {
        if (++stable >= stableNeeded) return root;
      } else {
        stable = 0;
        lastSig = sig;
      }
      await sleep(probeEvery);
    }
    return listRoot();
  }

  // Unused now; previously used to copy Starred's classes for Yellow Star row
  function getStarredClasses() {
    var a = document.querySelector(
      'a[href*="#starred"], a[aria-label*="Starred"]'
    );
    var row = a && a.closest ? a.closest(".aim") : null;
    var to = row ? row.querySelector(".TO") : null;
    var tn = row ? row.querySelector(".TN, .TN.UKr6le") : null;
    return {
      toClass: to ? to.className : "TO",
      tnClass: tn ? tn.className : "TN UKr6le",
    };
  }

  function buildUnreadRow() {
    var base = window.location.origin + window.location.pathname;
    var url = base + "#search/is%3Aunread";
    var active = isActive("#search/is:unread");
    var label = "Unread"; // Localization removed: use English consistently

    var uMain = document.createElement("div");
    uMain.id = UNREAD_ID;
    uMain.className = active ? "aim ain" : "aim";

    var uInner1 = document.createElement("div");
    uInner1.id = UNREAD_INNER_ID;
    uInner1.className = active ? "TO aS3 nZ aiq" : "TO aS3";
    uInner1.setAttribute("data-tooltip", "Unread");
    uInner1.setAttribute("data-tooltip-align", "r");

    var uInner2 = document.createElement("div");
    uInner2.className = "TN UKr6le";
    var uIcon = document.createElement("div");
    uIcon.className = "qj";
    var uWrap = document.createElement("div");
    uWrap.className = "aio UKr6le";
    var uSpan = document.createElement("span");
    uSpan.className = "nU";

    var uA = document.createElement("a");
    uA.className = "J-Ke n0";
    uA.href = url;
    uA.target = "_top";
    uA.setAttribute("aria-label", "Unread");
    // Anchor hidden from tab order; container is the focusable link
    uA.setAttribute("tabindex", "-1");
    uA.setAttribute("aria-hidden", "true");
    uA.setAttribute("draggable", "false");
    uA.textContent = label;

    // Make the whole row accessible as a link
    uMain.setAttribute("role", "link");
    uMain.setAttribute("tabindex", "0");
    uMain.setAttribute("aria-label", "Unread");
    uMain.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = uA.href;
    });
    uMain.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.location.href = uA.href;
      }
    });

    uSpan.appendChild(uA);
    var uRight = document.createElement("div");
    uRight.className = "nL aif";

    uWrap.appendChild(uSpan);
    uInner2.appendChild(uIcon);
    uInner2.appendChild(uWrap);
    uInner2.appendChild(uRight);
    uInner1.appendChild(uInner2);
    uMain.appendChild(uInner1);

    return uMain;
  }

  function buildYellowRow() {
    var base = window.location.origin + window.location.pathname;
    var active = isActive("#search/has:yellow-star");

    var yMain = document.createElement("div");
    yMain.id = YELLOW_ID;
    yMain.className = "aim";

    var yInner1 = document.createElement("div");
    yInner1.id = YELLOW_INNER_ID;
    yInner1.className = "TO aS3";
    yInner1.setAttribute("data-tooltip", "Yellow Star");
    yInner1.setAttribute("data-tooltip-align", "r");

    var yInner2 = document.createElement("div");
    yInner2.className = "TN UKr6le"; // generic; avoids Gmail special-casing

    var yIcon = document.createElement("div");
    yIcon.className = "qj";
    // Remove Gmail's sprite background so only our SVG shows
    yIcon.style.background = "none";
    yIcon.style.backgroundImage = "none";
    // Center the SVG within the qj box
    yIcon.style.display = "flex";
    yIcon.style.alignItems = "center";
    yIcon.style.justifyContent = "center";

    // Inline SVG star (forced white)
    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "18");
    svg.setAttribute("height", "18");
    var path = document.createElementNS(svgNS, "path");
    path.setAttribute(
      "d",
      "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
    );
    path.setAttribute("fill", "#ffffff");
    svg.appendChild(path);
    yIcon.appendChild(svg);

    var yWrap = document.createElement("div");
    yWrap.className = "aio UKr6le";
    var ySpan = document.createElement("span");
    ySpan.className = "nU";

    var yA = document.createElement("a");
    yA.className = "J-Ke n0";
    yA.href = base + "#search/has%3Ayellow-star";
    yA.target = "_top";
    yA.setAttribute("aria-label", "Yellow Star");
    // Anchor hidden from tab order; container is the focusable link
    yA.setAttribute("tabindex", "-1");
    yA.setAttribute("aria-hidden", "true");
    yA.setAttribute("draggable", "false");
    yA.textContent = "Yellow";

    // Make the whole row accessible as a link
    yMain.setAttribute("role", "link");
    yMain.setAttribute("tabindex", "0");
    yMain.setAttribute("aria-label", "Yellow Star");
    yMain.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = yA.href;
    });
    yMain.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.location.href = yA.href;
      }
    });

    ySpan.appendChild(yA);
    var yRight = document.createElement("div");
    yRight.className = "nL aif";

    yWrap.appendChild(ySpan);
    yInner2.appendChild(yIcon);
    yInner2.appendChild(yWrap);
    yInner2.appendChild(yRight);
    yInner1.appendChild(yInner2);
    yMain.appendChild(yInner1);

    if (active) {
      yMain.classList.add("ain");
      yInner1.classList.add("nZ", "aiq");
    }
    return yMain;
  }

  function buildWhiteStarIcon() {
    var yIcon = document.createElement("div");
    yIcon.className = "qj";
    yIcon.style.background = "none";
    yIcon.style.backgroundImage = "none";
    yIcon.style.display = "flex";
    yIcon.style.alignItems = "center";
    yIcon.style.justifyContent = "center";
    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "18");
    svg.setAttribute("height", "18");
    var path = document.createElementNS(svgNS, "path");
    path.setAttribute(
      "d",
      "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
    );
    path.setAttribute("fill", "#ffffff");
    svg.appendChild(path);
    yIcon.appendChild(svg);
    return yIcon;
  }

  function buildStarRow(mainId, innerId, labelText, tooltip, hashFrag) {
    var base = window.location.origin + window.location.pathname;
    var active = isActive(hashFrag);

    var m = document.createElement("div");
    m.id = mainId;
    m.className = "aim";

    var i1 = document.createElement("div");
    i1.id = innerId;
    i1.className = "TO aS3";
    i1.setAttribute("data-tooltip", tooltip);
    i1.setAttribute("data-tooltip-align", "r");

    var i2 = document.createElement("div");
    i2.className = "TN UKr6le";
    var icon = buildWhiteStarIcon();
    var wrap = document.createElement("div");
    wrap.className = "aio UKr6le";
    var span = document.createElement("span");
    span.className = "nU";

    var a = document.createElement("a");
    a.className = "J-Ke n0";
    a.href =
      base + "#search/" + encodeURIComponent(hashFrag.slice("#search/".length));
    a.target = "_top";
    a.setAttribute("aria-label", tooltip);
    // Anchor hidden from tab order; container is the focusable link
    a.setAttribute("tabindex", "-1");
    a.setAttribute("aria-hidden", "true");
    a.setAttribute("draggable", "false");
    a.textContent = labelText;

    // Make the whole row accessible as a link
    m.setAttribute("role", "link");
    m.setAttribute("tabindex", "0");
    m.setAttribute("aria-label", tooltip);
    m.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = a.href;
    });
    m.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.location.href = a.href;
      }
    });

    span.appendChild(a);
    var right = document.createElement("div");
    right.className = "nL aif";

    wrap.appendChild(span);
    i2.appendChild(icon);
    i2.appendChild(wrap);
    i2.appendChild(right);
    i1.appendChild(i2);
    m.appendChild(i1);

    if (active) {
      m.classList.add("ain");
      i1.classList.add("nZ", "aiq");
    }
    return m;
  }

  function insertAtIndex(list, row, index) {
    const kids = list ? list.children : null;
    if (!kids) {
      list.appendChild(row);
      return;
    }
    const target = kids[index] || null;
    if (target) list.insertBefore(row, target);
    else list.appendChild(row);
  }

  // Find the first user label row (top of the Labels section)
  function firstLabelRow(list) {
    if (!list) return null;
    var anchors = list.querySelectorAll('a.J-Ke.n0[href*="#label/"]');
    for (var i = 0; i < anchors.length; i++) {
      var aim = anchors[i].closest && anchors[i].closest(".aim");
      if (aim && aim.parentNode === list) return aim;
    }
    return null;
  }

  function lastCustomStarRow(list) {
    if (!list) return null;
    var set = new Set([UNREAD_ID, YELLOW_ID, RED_ID, GREEN_ID, BLUE_ID, PURPLE_ID]);
    var kids = list.children ? Array.from(list.children) : [];
    for (var i = kids.length - 1; i >= 0; i--) {
      var el = kids[i];
      if (set.has(el.id)) return el;
    }
    return null;
  }

  function insertUnread(list) {
    if (document.getElementById(UNREAD_ID)) return;
    var row = buildUnreadRow();
    var topLabel = firstLabelRow(list);
    if (topLabel) {
      list.insertBefore(row, topLabel);
    } else {
      list.appendChild(row);
    }
  }

  function insertYellow(list) {
    if (document.getElementById(YELLOW_ID)) return;
    insertStarAfter(list, buildYellowRow());
  }

  function keyToId(key) {
    if (key === "unread") return UNREAD_ID;
    if (key === "yellow") return YELLOW_ID;
    if (key === "red") return RED_ID;
    if (key === "green") return GREEN_ID;
    if (key === "blue") return BLUE_ID;
    if (key === "purple") return PURPLE_ID;
    return null;
  }

  function insertByKey(list, key) {
    if (key === "unread") insertUnread(list);
    else if (key === "yellow") insertYellow(list);
    else if (key === "red") insertRed(list);
    else if (key === "green") insertGreen(list);
    else if (key === "blue") insertBlue(list);
    else if (key === "purple") insertPurple(list);
  }

  var isReconciling = false;

  async function ensureRows() {
    if (isReconciling) return;
    var list = listRoot();
    if (!list) return;
    isReconciling = true;
    try {
      var settings = await getSettings();
      var order = (settings && settings.order) || DEFAULT_SETTINGS.order;
      var enabled = (settings && settings.enabled) || DEFAULT_SETTINGS.enabled;
      var desired = [];
      for (var i = 0; i < order.length; i++) {
        var k = order[i];
        if (enabled[k]) desired.push(k);
      }

      // Remove disabled rows, if any are present
      var known = DEFAULT_SETTINGS.order;
      for (var d = 0; d < known.length; d++) {
        var keyd = known[d];
        if (enabled[keyd]) continue;
        var idd = keyToId(keyd);
        var eld = idd && document.getElementById(idd);
        if (eld && eld.parentNode === list) {
          eld.parentNode.removeChild(eld);
        }
      }

      // Ensure existence
      for (var j = 0; j < desired.length; j++) {
        var key = desired[j];
        var id = keyToId(key);
        if (!id) continue;
        if (!document.getElementById(id)) insertByKey(list, key);
      }

      // Reorder by moving existing nodes before the first user label
      var topLabel = firstLabelRow(list);
      for (var m = 0; m < desired.length; m++) {
        var key2 = desired[m];
        var id2 = keyToId(key2);
        var el = document.getElementById(id2);
        if (el && el.parentNode === list) {
          if (topLabel) list.insertBefore(el, topLabel);
          else list.appendChild(el);
        }
      }
    } catch (e) {
      // swallow to avoid impacting page
    } finally {
      isReconciling = false;
    }
  }

  var ensureRowsDebounced = debounce(ensureRows, 300);

  function insertStarAfter(list, newRow) {
    var tail = lastCustomStarRow(list);
    if (tail && tail.nextSibling) list.insertBefore(newRow, tail.nextSibling);
    else if (tail) list.appendChild(newRow);
    else {
      var topLabel = firstLabelRow(list);
      if (topLabel) list.insertBefore(newRow, topLabel);
      else list.appendChild(newRow);
    }
  }

  function insertRed(list) {
    if (!document.getElementById(RED_ID))
      insertStarAfter(
        list,
        buildStarRow(
          RED_ID,
          RED_INNER_ID,
          "Red",
          "Red Star",
          "#search/has:red-star"
        )
      );
  }
  function insertGreen(list) {
    if (!document.getElementById(GREEN_ID))
      insertStarAfter(
        list,
        buildStarRow(
          GREEN_ID,
          GREEN_INNER_ID,
          "Green",
          "Green Star",
          "#search/has:green-star"
        )
      );
  }
  function insertBlue(list) {
    if (!document.getElementById(BLUE_ID))
      insertStarAfter(
        list,
        buildStarRow(
          BLUE_ID,
          BLUE_INNER_ID,
          "Blue",
          "Blue Star",
          "#search/has:blue-star"
        )
      );
  }
  function insertPurple(list) {
    if (!document.getElementById(PURPLE_ID))
      insertStarAfter(
        list,
        buildStarRow(
          PURPLE_ID,
          PURPLE_INNER_ID,
          "Purple",
          "Purple Star",
          "#search/has:purple-star"
        )
      );
  }

  function refreshActiveStates() {
    var activeUnread = isActive("#search/is:unread");
    var uInner = document.getElementById(UNREAD_INNER_ID);
    var uMain = document.getElementById(UNREAD_ID);
    if (uInner && uMain) {
      uMain.className = activeUnread ? "aim ain" : "aim";
      uInner.className = activeUnread ? "TO aS3 nZ aiq" : "TO aS3";
    }

    var activeYellow = isActive("#search/has:yellow-star");
    var yInner = document.getElementById(YELLOW_INNER_ID);
    var yMain = document.getElementById(YELLOW_ID);
    if (yInner && yMain) {
      yMain.classList.toggle("ain", activeYellow);
      yInner.classList.toggle("nZ", activeYellow);
      yInner.classList.toggle("aiq", activeYellow);
    }

    var redActive = isActive("#search/has:red-star");
    var rInner = document.getElementById(RED_INNER_ID);
    var rMain = document.getElementById(RED_ID);
    if (rInner && rMain) {
      rMain.classList.toggle("ain", redActive);
      rInner.classList.toggle("nZ", redActive);
      rInner.classList.toggle("aiq", redActive);
    }

    var greenActive = isActive("#search/has:green-star");
    var gInner = document.getElementById(GREEN_INNER_ID);
    var gMain = document.getElementById(GREEN_ID);
    if (gInner && gMain) {
      gMain.classList.toggle("ain", greenActive);
      gInner.classList.toggle("nZ", greenActive);
      gInner.classList.toggle("aiq", greenActive);
    }

    var blueActive = isActive("#search/has:blue-star");
    var bInner = document.getElementById(BLUE_INNER_ID);
    var bMain = document.getElementById(BLUE_ID);
    if (bInner && bMain) {
      bMain.classList.toggle("ain", blueActive);
      bInner.classList.toggle("nZ", blueActive);
      bInner.classList.toggle("aiq", blueActive);
    }

    var purpleActive = isActive("#search/has:purple-star");
    var pInner = document.getElementById(PURPLE_INNER_ID);
    var pMain = document.getElementById(PURPLE_ID);
    if (pInner && pMain) {
      pMain.classList.toggle("ain", purpleActive);
      pInner.classList.toggle("nZ", purpleActive);
      pInner.classList.toggle("aiq", purpleActive);
    }
  }

  async function boot() {
    const list = await waitForStableTK();
    if (!list) return;
    var settings = await getSettings();
    var order = settings.order || DEFAULT_SETTINGS.order;
    var enabled = settings.enabled || DEFAULT_SETTINGS.enabled;
    for (var idx = 0; idx < order.length; idx++) {
      var key = order[idx];
      if (!enabled[key]) continue;
      if (key === "unread") insertUnread(list);
      else if (key === "yellow") insertYellow(list);
      else if (key === "red") insertRed(list);
      else if (key === "green") insertGreen(list);
      else if (key === "blue") insertBlue(list);
      else if (key === "purple") insertPurple(list);
    }
    refreshActiveStates();
    // Events: keep active states and lightly reconcile
    window.addEventListener("hashchange", function () {
      refreshActiveStates();
      ensureRowsDebounced();
    });

    // Apply a post-boot reconcile to catch late UI shifts
    setTimeout(ensureRows, 1200);

    // Live-update on options changes
    try {
      if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.onChanged) {
        chrome.storage.onChanged.addListener(function (changes, area) {
          if (area === "sync" && changes && changes[STORAGE_KEY]) {
            ensureRowsDebounced();
            refreshActiveStates();
          }
        });
      }
    } catch (e) {}
  }

  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  )
    boot();
  else window.addEventListener("load", boot, { once: true });
})();
