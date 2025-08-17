// content.js — Unread + Yellow ★ (stable insert once, no observers)
(function () {
  var UNREAD_ID = 'BVid1';
  var UNREAD_INNER_ID = 'BVid2';
  var YELLOW_ID = 'YVid1';
  var YELLOW_INNER_ID = 'YVid2';

  function listRoot() { return document.getElementsByClassName('TK')[0]; }
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  function isActive(hash) { return decodeURIComponent(location.hash || '') === hash; }

  // Wait until the sidebar stops changing before inserting (prevents flicker/dupes)
  async function waitForStableTK(maxMs = 2000, probeEvery = 150, stableNeeded = 4) {
    const start = Date.now();
    let lastSig = null, stable = 0;
    while (Date.now() - start < maxMs) {
      const root = listRoot();
      if (!root) { await sleep(probeEvery); continue; }
      const labels = Array.from(root.querySelectorAll('.aim .nU'))
        .slice(0, 8)
        .map(s => (s.textContent || '').trim())
        .join('|');
      const sig = root.childElementCount + ':' + labels;
      if (sig === lastSig) {
        if (++stable >= stableNeeded) return root;
      } else { stable = 0; lastSig = sig; }
      await sleep(probeEvery);
    }
    return listRoot();
  }

  // Unused now; previously used to copy Starred's classes for Yellow Star row
  function getStarredClasses() {
    var a = document.querySelector('a[href*="#starred"], a[aria-label*="Starred"]');
    var row = a && a.closest ? a.closest('.aim') : null;
    var to  = row ? row.querySelector('.TO') : null;
    var tn  = row ? row.querySelector('.TN, .TN.UKr6le') : null;
    return {
      toClass: to ? to.className : 'TO',
      tnClass: tn ? tn.className : 'TN UKr6le'
    };
  }

  function buildUnreadRow() {
    var base = window.location.origin + window.location.pathname;
    var url = base + '#search/is%3Aunread';
    var active = isActive('#search/is:unread');

    var htmlLang = document.documentElement.lang;
    var label = htmlLang == 'uk' ? 'Непрочитані' : htmlLang == 'ru' ? 'Непрочитаные' : 'Unread';

    var uMain = document.createElement('div');
    uMain.id = UNREAD_ID;
    uMain.className = active ? 'aim ain' : 'aim';

    var uInner1 = document.createElement('div');
    uInner1.id = UNREAD_INNER_ID;
    uInner1.className = active ? 'TO aS3 nZ aiq' : 'TO aS3';
    uInner1.setAttribute('data-tooltip', 'Unread');
    uInner1.setAttribute('data-tooltip-align', 'r');

    var uInner2 = document.createElement('div'); uInner2.className = 'TN UKr6le';
    var uIcon   = document.createElement('div'); uIcon.className   = 'qj';
    var uWrap   = document.createElement('div'); uWrap.className   = 'aio UKr6le';
    var uSpan   = document.createElement('span'); uSpan.className  = 'nU';

    var uA = document.createElement('a');
    uA.className = 'J-Ke n0';
    uA.href = url; uA.target = '_top';
    uA.setAttribute('aria-label','Unread');
    uA.setAttribute('tabindex','-1');
    uA.setAttribute('draggable','false');
    uA.textContent = label;

    uMain.addEventListener('click', function (e) { e.preventDefault(); window.location.href = uA.href; });

    uSpan.appendChild(uA);
    var uRight = document.createElement('div'); uRight.className = 'nL aif';

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
    var active = isActive('#search/has:yellow-star');

    var yMain = document.createElement('div');
    yMain.id = YELLOW_ID; yMain.className = 'aim';

    var yInner1 = document.createElement('div');
    yInner1.id = YELLOW_INNER_ID;
    yInner1.className = 'TO aS3';
    yInner1.setAttribute('data-tooltip','Yellow Star');
    yInner1.setAttribute('data-tooltip-align','r');

    var yInner2 = document.createElement('div');
    yInner2.className = 'TN UKr6le'; // generic; avoids Gmail special-casing

    var yIcon = document.createElement('div');
    yIcon.className = 'qj';
    // Remove Gmail's sprite background so only our SVG shows
    yIcon.style.background = 'none';
    yIcon.style.backgroundImage = 'none';
    // Center the SVG within the qj box
    yIcon.style.display = 'flex';
    yIcon.style.alignItems = 'center';
    yIcon.style.justifyContent = 'center';

    // Inline SVG star (forced white)
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '18');
    svg.setAttribute('height', '18');
    var path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d','M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z');
    path.setAttribute('fill','#ffffff');
    svg.appendChild(path);
    yIcon.appendChild(svg);

    var yWrap = document.createElement('div'); yWrap.className = 'aio UKr6le';
    var ySpan = document.createElement('span'); ySpan.className = 'nU';

    var yA = document.createElement('a');
    yA.className = 'J-Ke n0';
    yA.href = base + '#search/has%3Ayellow-star';
    yA.target = '_top';
    yA.setAttribute('aria-label','Yellow Star');
    yA.setAttribute('tabindex','-1');
    yA.setAttribute('draggable','false');
    yA.textContent = 'Yellow ★';

    yMain.addEventListener('click', function (e) { e.preventDefault(); window.location.href = yA.href; });

    ySpan.appendChild(yA);
    var yRight = document.createElement('div'); yRight.className = 'nL aif';

    yWrap.appendChild(ySpan);
    yInner2.appendChild(yIcon);
    yInner2.appendChild(yWrap);
    yInner2.appendChild(yRight);
    yInner1.appendChild(yInner2);
    yMain.appendChild(yInner1);

    if (active) {
      yMain.classList.add('ain');
      yInner1.classList.add('nZ','aiq');
    }
    return yMain;
  }

  function insertAtIndex(list, row, index) {
    const kids = list ? list.children : null;
    if (!kids) { list.appendChild(row); return; }
    const target = kids[index] || null;
    if (target) list.insertBefore(row, target); else list.appendChild(row);
  }

  // Find the first user label row (top of the Labels section)
  function firstLabelRow(list) {
    if (!list) return null;
    var anchors = list.querySelectorAll('a.J-Ke.n0[href*="#label/"]');
    for (var i = 0; i < anchors.length; i++) {
      var aim = anchors[i].closest && anchors[i].closest('.aim');
      if (aim && aim.parentNode === list) return aim;
    }
    return null;
  }

  function insertUnread(list) {
    if (!document.getElementById(UNREAD_ID)) {
      insertAtIndex(list, buildUnreadRow(), 1); // between Inbox and Starred
    }
  }

  function insertYellow(list) {
    if (document.getElementById(YELLOW_ID)) return;
    var row = buildYellowRow();
    var topLabel = firstLabelRow(list);
    if (topLabel) {
      list.insertBefore(row, topLabel);
    } else {
      // Fallback: append at the end if no labels section is present
      list.appendChild(row);
    }
  }

  function refreshActiveStates() {
    var activeUnread = (location.hash === '#search/is%3Aunread');
    var uInner = document.getElementById(UNREAD_INNER_ID);
    var uMain  = document.getElementById(UNREAD_ID);
    if (uInner && uMain) {
      uMain.className  = activeUnread ? 'aim ain' : 'aim';
      uInner.className = activeUnread ? 'TO aS3 nZ aiq' : 'TO aS3';
    }

    var activeYellow = isActive('#search/has:yellow-star');
    var yInner = document.getElementById(YELLOW_INNER_ID);
    var yMain  = document.getElementById(YELLOW_ID);
    if (yInner && yMain) {
      yMain.classList.toggle('ain', activeYellow);
      yInner.classList.toggle('nZ', activeYellow);
      yInner.classList.toggle('aiq', activeYellow);
    }
  }

  async function boot() {
    const list = await waitForStableTK();
    if (!list) return;
    insertUnread(list);
    insertYellow(list);
    refreshActiveStates();
    window.addEventListener('hashchange', refreshActiveStates);
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') boot();
  else window.addEventListener('load', boot, { once: true });
})();