Better Gmail Sidebar — Chrome Web Store Materials

Use this document to fill out the Chrome Web Store listing and ship new releases smoothly. Text is ready to copy/paste. Image guidelines and a submission checklist are included.

Store Listing
- Name: Better Gmail Sidebar
- Category: Productivity
- Primary language: English (United States)
- Short description (≤ 132 chars):
  Add Unread and Star‑color shortcuts to Gmail’s sidebar. Instant options to enable/disable and reorder. No data collection.

- Full description:
  Better Gmail Sidebar adds quick‑access rows to Gmail’s left sidebar — an Unread link and shortcuts for different star colors — so you can jump to the messages you care about faster. The Options page (styled like Chrome Settings) lets you enable/disable items and drag to reorder, and changes apply instantly. Keyboard access is built in (Enter/Space), and the extension uses only the minimum permission (storage). No analytics, no external network requests, and no data collection.

  Features
  - Unread: one‑click filter to show unread messages
  - Star colors: Yellow, Red, Green, Blue, Purple
  - Options: instant save, drag reorder, Reset to defaults
  - Accessibility: focusable rows; Enter/Space activation
  - Minimal permissions: runs only on Gmail, stores settings locally
  - Toolbar action: opens Options

  Privacy
  - No analytics or tracking
  - No external network requests
  - Settings stored locally via chrome.storage.sync

  Permissions
  - storage (save your options)
  - Host: https://mail.google.com/* (run only on Gmail)

Assets & Images
- Extension icons (already in repo): 16, 24, 32, 48, 128 px (PNG, transparent). Source: icons/icon-src.svg
- Screenshots (PNG/JPG): provide 3–6 at 1280×800 (recommended) or 640×400 (minimum)
  1) Inbox with the added “Unread” and star rows visible (light theme)
  2) Options page: toggles and drag‑reorder (light theme)
  3) Inbox in dark theme showing icons with good contrast
  4) Optional: “Unread” results page after clicking the Unread row
  5) Optional: keyboard focus on a custom row (focus ring visible)
- Promotional tile (optional but nice): 440×280 (PNG/JPG) — a simple composition: small Gmail sidebar crop + app name on brand‑neutral background

Privacy Policy & Support
- Privacy Policy URL: point to PRIVACY.md in this repository (or your website). Example: https://github.com/<your‑org>/<repo>/blob/main/PRIVACY.md
- Support URL: GitHub Issues or a simple support page. Example: https://github.com/<your‑org>/<repo>/issues

Data Safety (declaration guidance)
- Collects or uses personal/sensitive user data: No
- Sells data: No
- Shares data with third parties: No
- Uses or transfers user data for purposes unrelated to core functionality: No
- Handles financial/payment information: No
- Uses location: No
- Uses device identifiers: No
- Accesses or collects web browsing activity beyond Gmail: No
- Loads remote code or uses code obfuscation: No (MV3; no remote eval)

Release Notes (Examples)
- 1.1.2: Icon theming via CSS var with light/dark contrast; add ESLint/Prettier; docs updates.
- 1.1.1: Options robustness fix for keys with ‘:’; CSS variables for Options.
- 1.1.0: Chrome Settings–style Options redesign; instant save; drag‑reorder; Saved pill.

Submission Checklist
- [ ] Bump version in manifest.json (SemVer rules per CODEX.md)
- [ ] Update CHANGELOG.md and README.md if needed
- [ ] Verify icons render at 16/24/32/48/128
- [ ] Verify Options: toggles, drag reorder, Reset, Saved pill
- [ ] Verify in Gmail: Unread + star rows appear; keyboard activation works; icon contrast is good in light/dark
- [ ] Build clean ZIP (exclude .git, .vscode, linters, docs): better-gmail-<version>.zip
- [ ] Upload to Chrome Web Store, fill in listing (copy from this doc)
- [ ] Paste Release Notes (from CHANGELOG)
- [ ] Submit for review

Notes
- Runs strictly on https://mail.google.com/* and uses only storage permission.
- English‑only labels by design.

Store Privacy Form Answers

Use these concise answers in the Chrome Web Store “Privacy” section of the listing form.

- Single purpose description
  Better Gmail Sidebar adds quick Unread and Star‑color shortcuts to Gmail’s left sidebar so users can filter messages with one click. The extension only modifies the Gmail sidebar UI and provides an Options page to enable/disable and reorder these shortcuts.

- storage justification
  The extension saves the user’s preferences (which shortcuts are enabled and their order) using chrome.storage.sync so those options persist across sessions and, if the user is signed into Chrome, can sync to their other Chrome profiles. No email content or personal data is stored.

- Host permission justification (https://mail.google.com/*)
  The extension needs access to Gmail pages to add its sidebar shortcuts and to handle clicks that navigate to the corresponding Gmail search URLs (e.g., #search/is:unread). It does not access other sites and does not collect any data from Gmail beyond what is needed to render and operate the sidebar rows.

- Are you using remote code?
  No, I am not using remote code.

- Remote code justification (if a text field still appears)
  All JavaScript, HTML, and CSS are packaged with the extension. The extension does not load code from external URLs, does not evaluate strings via eval(), and does not include dynamic Wasm modules. There are no analytics SDKs or third‑party libraries fetched at runtime.
