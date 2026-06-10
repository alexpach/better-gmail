Better Gmail Sidebar for Safari

A minimal Safari extension that adds quick-access rows to the Gmail left sidebar: one for Unread and shortcuts for different Star colors. It blends into Gmail's UI, is keyboard accessible, and lets you enable/disable and reorder items from an Options page.

Features

- Unread: one-click filter to show unread messages.
- Star colors: shortcuts for Yellow, Red, Green, Blue, and Purple stars.
- Options: Settings-style page to enable/disable items and drag to reorder; changes apply instantly; includes Reset to defaults.
- Accessibility: rows are focusable and activate via Enter/Space.
- Lightweight resilience: reconciles after navigation changes, settings updates, and shortly after load.
- Minimal permissions: uses `storage` only; runs as a content script on Gmail.
- Toolbar action: click the extension icon to open Options.
- Theming: icon color uses CSS variables and adapts to light/dark for good contrast.

Supported Browser/Site

- Safari 14.0 or later (Manifest V3)
- Gmail at `https://mail.google.com/*`

Building the Safari Extension

This extension requires macOS with Xcode to build and run. Safari extensions must be wrapped in a native app using Xcode.

### Method 1: Use Safari Web Extension Converter (Recommended)

1. **Install Xcode** from the Mac App Store (if not already installed)
2. **Open Terminal** and navigate to this directory
3. **Run the converter**:
   ```bash
   xcrun safari-web-extension-converter /path/to/better-gmail-safari
   ```
4. Follow the prompts to create the Xcode project
5. **Open the generated Xcode project**
6. **Build and run** the project (Cmd+R)
7. **Enable the extension** in Safari:
   - Open Safari → Settings → Extensions
   - Enable "Better Gmail Sidebar"
8. Open Gmail and use the new sidebar rows

### Method 2: Manual Xcode Setup

1. **Create a new Safari Extension project** in Xcode:
   - File → New → Project → macOS → Safari Extension App
2. **Replace the Resources folder** with the contents of this directory
3. **Update Info.plist** with appropriate permissions
4. **Build and run** (Cmd+R)
5. **Enable in Safari Settings → Extensions**

Install from App Store (Coming Soon)

The extension will be published to the Mac App Store. Installation instructions will be added here once published.

Development and Testing

To test changes during development:

1. Make changes to the extension files (content.js, options.js, etc.)
2. In Xcode, clean and rebuild (Cmd+Shift+K, then Cmd+B)
3. Restart the extension from Safari → Settings → Extensions
4. Reload Gmail to see changes

Note: Unlike Chrome extensions, Safari extensions require a rebuild in Xcode after code changes.

Privacy

- No analytics, no external network requests, and no data collection.
- Settings are stored locally via `browser.storage.sync`.

Permissions

- `storage` (save your options)
- Host: `https://mail.google.com/*` (run only on Gmail)

Troubleshooting

- If rows don't appear, reload Gmail after enabling the extension.
- If the extension doesn't show up in Safari Settings, rebuild in Xcode.
- Ensure you're running Safari 14.0 or later.
- Gmail UI changes can occasionally affect styling/placement; please report issues.

Differences from Chrome Version

- Background script uses `scripts` array instead of `service_worker`
- Uses `browser` namespace (though `chrome` is supported for compatibility)
- Requires macOS and Xcode to build
- Must be wrapped in a native app container
- Distributed via Mac App Store instead of web store

Feedback

- Open an issue with a brief description, steps to reproduce, and your Safari/macOS version.
- Include the Xcode build log if applicable.

Related

- Chrome version: [better-gmail](../better-gmail/)
- Firefox version: Coming soon
