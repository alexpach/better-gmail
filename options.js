(() => {
  const DEFAULT = {
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

  const STORAGE_KEY = "betterGmailSidebar";

  function $(sel, root = document) {
    return root.querySelector(sel);
  }
  function $all(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
  }

  function normalizeSettings(s) {
    const known = new Set(DEFAULT.order);
    const order = (s && Array.isArray(s.order) ? s.order : DEFAULT.order).filter(
      (k) => known.has(k)
    );
    // Ensure all keys appear in order exactly once
    DEFAULT.order.forEach((k) => {
      if (!order.includes(k)) order.push(k);
    });
    const enabled = Object.assign({}, DEFAULT.enabled, s && s.enabled);
    return { order, enabled };
  }

  function getSettings() {
    return new Promise((resolve) => {
      try {
        chrome.storage.sync.get(STORAGE_KEY, (obj) => {
          resolve(normalizeSettings(obj && obj[STORAGE_KEY]));
        });
      } catch (e) {
        resolve(DEFAULT);
      }
    });
  }

  let __pillTimer = null;
  function setStatus(msg) {
    const pill = $("#save-pill");
    if (!pill) return;
    if (__pillTimer) { clearTimeout(__pillTimer); __pillTimer = null; }
    if (msg) {
      pill.textContent = msg;
      pill.classList.add('is-visible');
      __pillTimer = setTimeout(() => {
        pill.classList.remove('is-visible');
        pill.textContent = '';
      }, 1200);
    } else {
      pill.classList.remove('is-visible');
      pill.textContent = '';
    }
  }

  function move(li, dir) {
    const parent = li.parentElement;
    if (!parent) return;
    if (dir === -1 && li.previousElementSibling) {
      parent.insertBefore(li, li.previousElementSibling);
    } else if (dir === 1 && li.nextElementSibling) {
      parent.insertBefore(li.nextElementSibling, li);
    }
  }
  
  function bindDragAndSave() {
    const list = $("#rows-list");
    let dragging = null;
    list.addEventListener("dragstart", (e) => {
      const li = e.target && e.target.closest && e.target.closest("li[draggable]");
      if (!li) return;
      dragging = li;
      li.classList.add("dragging");
      try { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", li.dataset.key || ""); } catch (_) {}
    });
    list.addEventListener("dragover", (e) => {
      if (!dragging) return;
      e.preventDefault();
      const over = e.target && e.target.closest && e.target.closest("li[draggable]");
      if (!over || over === dragging) return;
      const rect = over.getBoundingClientRect();
      const before = (e.clientY - rect.top) < rect.height / 2;
      over.classList.add("drag-over");
      if (before) list.insertBefore(dragging, over); else list.insertBefore(dragging, over.nextSibling);
    });
    ["dragleave", "drop"].forEach((ev) => {
      list.addEventListener(ev, (e) => {
        const li = e.target && e.target.closest && e.target.closest("li[draggable]");
        if (li) li.classList.remove("drag-over");
        if (ev === "drop") { e.preventDefault(); save(); }
      });
    });
    list.addEventListener("dragend", () => {
      if (dragging) dragging.classList.remove("dragging");
      dragging = null;
      save();
    });
    // Keyboard fallback: Alt+ArrowUp/Down on a row moves it
    $all("#rows-list li").forEach((li) => {
      li.addEventListener("keydown", (e) => {
        if (!e.altKey) return;
        if (e.key === "ArrowUp") { move(li, -1); save(); e.preventDefault(); }
        else if (e.key === "ArrowDown") { move(li, 1); save(); e.preventDefault(); }
      });
    });
  }

  async function load() {
    const s = await getSettings();
    // Checkboxes
    Object.entries(s.enabled).forEach(([key, val]) => {
      const cb = $(`#cb-${key}`);
      if (cb) cb.checked = !!val;
    });
    // Order: reorder <li>s to match saved order
    const list = $("#rows-list");
    s.order.forEach((key) => {
      const li = list.querySelector(`li[data-key="${key}"]`);
      if (li) list.appendChild(li);
    });
  }

  function currentSettingsFromUI() {
    const order = $all("#rows-list li").map((li) => li.getAttribute("data-key"));
    const enabled = {};
    order.forEach((key) => {
      const cb = $(`#cb-${key}`);
      enabled[key] = !!(cb && cb.checked);
    });
    return { order, enabled };
  }

  function save() {
    const s = currentSettingsFromUI();
    try {
      chrome.storage.sync.set({ [STORAGE_KEY]: s }, () => setStatus("Saved"));
    } catch (e) {
      setStatus("Unable to save in this browser.");
    }
  }

  function reset() {
    try {
      chrome.storage.sync.set({ [STORAGE_KEY]: DEFAULT }, () => {
        load().then(() => setStatus("Reset"));
      });
    } catch (e) {
      setStatus("Unable to reset in this browser.");
    }
  }

  function bindImmediateSave() {
    // Toggle checkboxes save on change
    $all('#rows-list input[type="checkbox"]').forEach((cb) => {
      cb.addEventListener("change", save);
    });
  }

  function setHeaderFromManifest() {
    try {
      const m = chrome.runtime.getManifest();
      const pill = $("#version-pill");
      const sub = $("#subtitle");
      if (pill && m && m.version) pill.textContent = `v${m.version}`;
      if (sub && m && m.description) sub.textContent = m.description;
    } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", () => {
    setHeaderFromManifest();
    bindImmediateSave();
    bindDragAndSave();
    $("#reset").addEventListener("click", reset);
    load();
  });
})();
