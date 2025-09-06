# Better Gmail Sidebar — Remaining TODO

Active items only. Completed work has been removed.

## Options Page Polish
- [x] Update design and layout to match `chrome://settings/` styles.
- [x] Use system fonts, section headers, and spacing consistent with Chrome Settings.
- [x] Align controls (toggles, drag handles) and ensure keyboard/focus states.
- [x] Keep storage logic as-is; auto-save changes and reflect in Gmail immediately.

## Theming
- [x] Support light theme: star glyphs should be dark on light backgrounds.
- [ ] Choose safe colors via CSS variables; avoid hard-coded white icons.
- [ ] Verify contrast/legibility for both light and dark Gmail themes.

## Code Hygiene
- [ ] Optional: add ESLint/Prettier with a minimal config (no build step needed).
- [x] Fix Options selector bug for keys containing ':' by using row-scoped queries.

## Store Prep (Chrome Web Store)
- [ ] Update changelog and release notes.
- [ ] Prepare descriptions (short/long), feature bullets, and privacy statement.
- [ ] Capture screenshots (e.g., 1280×800) showing Unread and star rows, and Options.
- [ ] Verify icons (16/32/48/128) and branding compliance.
- [ ] Confirm minimal permissions (`storage`, Gmail host) and MV3 validity.
- [ ] Package a clean ZIP (exclude `.git`, `.vscode`, etc.).

## Low Priority: DOM Robustness (Deferred)
- [ ] Prefer cloning a nearby native row (e.g., Starred or a label) to inherit Gmail classes.
- [ ] Replace brittle hardcoded class sets where safe; keep current classes as fallback.
- [ ] Centralize selectors/classnames in a small helper to ease future updates.
- [ ] Provide a fallback to the current manual-build path if cloning fails.
- [ ] Acceptance: visual parity, keyboard nav works, no duplicate IDs/ARIA.

---

Suggested Implementation Order
1. Options Page Polish
2. Theming
3. Store Prep
4. Code Hygiene (optional)
5. DOM Robustness (low priority)
