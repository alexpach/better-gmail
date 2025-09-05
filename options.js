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

  function setStatus(msg) {
    const el = $("#status");
    el.textContent = msg || "";
    if (msg) setTimeout(() => (el.textContent = ""), 1500);
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

  function bindRowControls() {
    $all("#rows-list li").forEach((li) => {
      const up = li.querySelector(".up");
      const down = li.querySelector(".down");
      up.addEventListener("click", () => move(li, -1));
      down.addEventListener("click", () => move(li, 1));
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
      chrome.storage.sync.set({ [STORAGE_KEY]: s }, () => setStatus("Saved."));
    } catch (e) {
      setStatus("Unable to save in this browser.");
    }
  }

  function reset() {
    try {
      chrome.storage.sync.set({ [STORAGE_KEY]: DEFAULT }, () => {
        load().then(() => setStatus("Reset to defaults."));
      });
    } catch (e) {
      setStatus("Unable to reset in this browser.");
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindRowControls();
    $("#save").addEventListener("click", save);
    $("#reset").addEventListener("click", reset);
    load();
  });
})();

