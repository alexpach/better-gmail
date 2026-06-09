# Better Gmail Sidebar — Remaining TODO

Active items only. Completed work has been removed.

## Theming
- [x] Choose safe colors via CSS variables; avoid hard-coded white icons.
- [x] Verify contrast/legibility for both light and dark Gmail themes.

## Code Hygiene
- [x] Optional: add ESLint/Prettier with a minimal config (no build step needed).

## Store Prep (Chrome Web Store) — Done: published (1.1.2)
- [x] Update changelog and release notes.
- [x] Prepare descriptions (short/long), feature bullets, and privacy statement.
- [x] Capture screenshots (e.g., 1280×800) showing Unread and star rows, and Options.
- [x] Verify icons (16/32/48/128) and branding compliance (passed store review).
- [x] Confirm minimal permissions (`storage`, Gmail host) and MV3 validity.
- [x] Package a clean ZIP (exclude `.git`, `.vscode`, etc.).
- [x] Submit to Chrome Web Store — live.
- [ ] Add the direct Chrome Web Store listing URL to README.md.

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
