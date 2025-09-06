# Better Gmail Sidebar — Remaining TODO

Active items only. Completed work has been removed.

## Theming
- [x] Choose safe colors via CSS variables; avoid hard-coded white icons.
- [x] Verify contrast/legibility for both light and dark Gmail themes.

## Code Hygiene
- [x] Optional: add ESLint/Prettier with a minimal config (no build step needed).

## Store Prep (Chrome Web Store)
- [x] Update changelog and release notes.
- [x] Prepare descriptions (short/long), feature bullets, and privacy statement.
- [x] Capture screenshots (e.g., 1280×800) showing Unread and star rows, and Options.
- [ ] Verify icons (16/32/48/128) and branding compliance.
- [x] Confirm minimal permissions (`storage`, Gmail host) and MV3 validity.
- [x] Package a clean ZIP (exclude `.git`, `.vscode`, etc.).

## Low Priority: DOM Robustness (Deferred)
- [ ] Prefer cloning a nearby native row (e.g., Starred or a label) to inherit Gmail classes.
- [ ] Replace brittle hardcoded class sets where safe; keep current classes as fallback.
- [ ] Centralize selectors/classnames in a small helper to ease future updates.
- [ ] Provide a fallback to the current manual-build path if cloning fails.
- [ ] Acceptance: visual parity, keyboard nav works, no duplicate IDs/ARIA.

---

Suggested Implementation Order
1. Theming
2. Store Prep
3. Code Hygiene (optional)
4. DOM Robustness (low priority)
