Better Gmail Sidebar — Codex Notes

This document captures project preferences, constraints, and working agreements so future iterations start with the right context.

Project Snapshot
- Purpose: Add quick Unread and Star-color rows to Gmail’s left sidebar.
- Platform: Chrome, Manifest V3, content script only (no background network I/O).
- Scope now: No DOM robustness refactor. Focus on polish, options UX, theming, and store prep.

Repository Overview
- `manifest.json`: MV3 manifest (icons, content_scripts, options_page, action, background service worker).
- `content.js`: Main logic that inserts sidebar rows and wires events/options.
- `options.html` / `options.js`: Options UI and storage.
- `background.js`: MV3 service worker; toolbar icon opens Options.
- `icons/`: Icon source and generated PNGs.
- `README.md`: Setup, features, privacy.
- `TODO.md`: Active work list only (completed items removed).

Working Preferences
- Do not auto‑commit after changes. Stage updates and wait for approval.
- Always bump `manifest.json` version before committing a release (recommend SemVer; e.g., 1.1.0 for new features, x.y.z).
- Keep diffs surgical; avoid unrelated changes.
- Minimal permissions: `storage` only; `host_permissions` for Gmail.
- Avoid MutationObserver and heavy watchers in this version.
- DOM robustness work is deferred and low priority; keep approach notes in TODO for later.
- Maintain accessibility: keyboard focus, Enter/Space activation, ARIA labels.
- No external network calls or analytics.

Icon Guidelines
- Source: `icons/icon-src.svg` is the single source of truth.
- Output sizes (PNG32 with alpha): 16, 24, 32, 48, 128.
- Visual spec: glyph only, gray `#5f6368`, fully transparent background.
- Sizing: slightly reduced padding so glyph reads larger.
  - Approx zoom per size used so far: 16→1.22, 24→1.18, 32→1.15, 48→1.12, 128→1.10.
- Rendering tips (ImageMagick v7):
  - Use high density and preserve alpha. Example:
    - `magick -background none -alpha on -density 2048 icons/icon-src.svg -resize {scale}x{scale} -gravity center -extent {size}x{size} PNG32:icons/icon-{size}.png`
  - Prefer Lanczos resample; for extra crisp 16px, consider nearest‑neighbor (point) and/or a light unsharp.

Manifest Guidelines (MV3)
- Required fields already present: `manifest_version: 3`, name, description, version, `icons`, `options_page`, `content_scripts` (Gmail only), `permissions: ["storage"]`, `host_permissions: ["https://mail.google.com/*"]`.
- Toolbar action:
  - `action.default_icon`: 16/24/32
  - `action.default_title`: "Better Gmail Sidebar"
- Background:
  - `background.service_worker`: `background.js` (opens Options on click)
- Do not add extra permissions or APIs without explicit need.

Options Page Guidelines
- When polishing: match `chrome://settings/` look & feel.
  - System font stack, section headings, consistent spacing, clear focus states.
  - Keyboard accessible controls; preserve current storage behavior.

Theming Guidelines
- Support light themes; ensure star glyphs/icons are dark on light backgrounds.
- Use CSS variables for colors where possible; avoid hard‑coded pure white icons.

DOM Robustness (Deferred Plan)
- Later, prefer cloning a native Gmail row to inherit structure/classes.
- Keep native anchor semantics; only update href/text/labels.
- Inject our SVG into Gmail’s icon container; avoid inline styles.
- Centralize selectors in one helper; fall back to current manual build if cloning fails.

Test & Verify Checklist
- Load/Reload unpacked at `chrome://extensions`.
- Verify icons at 16/24/32/48/128; transparent background; adequate size.
- Toolbar action opens Options.
- Options changes persist (`chrome.storage.sync`) and reflect in Gmail.
- In Gmail: Unread and star rows appear; keyboard activation works; URL filters correct.

Release Process
- Versioning rules (SemVer x.y.z):
  - Bug fix: bump patch (z = z + 1).
  - New feature: bump minor (y = y + 1) and reset patch to 0.
  - Major (x): bump only when explicitly instructed.
  - Always update `manifest.json` version before committing a release.
- Update `manifest.json` version.
- Ensure README/TODO reflect changes.
- Build artifacts: ensure only `icons/icon-*.png` and `icons/icon-src.svg` are included; exclude `.git`, `.vscode`, and temp files when zipping.
- Zip folder for Chrome Web Store; prepare description, screenshots, and privacy text.

Coding Style
- Vanilla JS; keep functions small and focused.
- Avoid one‑letter variable names.
- Inline comments only where they add clarity (selectors, assumptions).
- Don’t introduce tooling (build steps, transpilers) unless requested.

Contact & Support
- Issues should include a brief description, steps to reproduce, and Chrome version.
