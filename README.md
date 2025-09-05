Better Gmail Sidebar

A minimal Chrome extension that adds quick-access rows to the Gmail left sidebar: one for Unread and shortcuts for different Star colors. It blends into Gmail’s UI, is keyboard accessible, and lets you enable/disable and reorder items from an Options page.

Features
- Unread: one-click filter to show unread messages.
- Star colors: shortcuts for Yellow, Red, Green, Blue, and Purple stars.
- Options: enable/disable items and control their order.
- Accessibility: rows are focusable and activate via Enter/Space.
- Lightweight resilience: reconciles after navigation changes, settings updates, and shortly after load.
- Minimal permissions: uses `storage` only; runs as a content script on Gmail.
 - Toolbar action: click the extension icon to open Options.

Supported Browser/Site
- Chrome (Manifest V3)
- Gmail at `https://mail.google.com/*`
- Note: Other browsers or sites are not currently supported.

Install (Load Unpacked)
1) Download or clone this repository.
2) Open `chrome://extensions` in Chrome.
3) Toggle “Developer mode” on (top right).
4) Click “Load unpacked” and select the project folder.
5) In the extension’s “Details”, open “Extension options” to configure order and visibility.
6) Open Gmail and use the new sidebar rows.
7) Optional: Pin the toolbar icon; clicking it opens Options.

Privacy
- No analytics, no external network requests, and no data collection.
- Settings are stored locally via `chrome.storage.sync`.

Troubleshooting
- If rows don’t appear, reload Gmail after installing or saving options.
- If order doesn’t reflect immediately, wait a moment or refresh the page.
- Gmail UI changes can occasionally affect styling/placement; please report issues.

Feedback
- Open an issue with a brief description, steps to reproduce, and your Chrome version.
