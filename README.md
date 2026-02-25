# MyEpiPlus

> A lightweight browser extension that enhances the interface of [my.epitech.eu](https://my.epitech.eu).

---

## Features

| Feature | Status | Description |
|---|---|---|
| **Grade Addon** | ✅ Active | Displays colored grade badges (A–E) directly on module blocks |
| **UI Addon** | 🔜 Coming Soon | Visual upgrades and interface improvements |

### Grade Addon

The Grade Addon fetches your grades from the Epitech API for all your semesters and injects color-coded badges next to each module block on the intranet:

| Grade | Color |
|---|---|
| A | 🟢 Teal |
| B | 🔵 Blue |
| C | 🟡 Yellow |
| D | 🟠 Orange |
| E | 🔴 Red |

---

## Installation

### Chrome / Chromium

Install directly from the **Chrome Web Store**:
[👉 Add to Chrome](https://chromewebstore.google.com/detail/phamedghehobpnbhpemgpbophoojaeio)

### Firefox

Install directly from **Firefox Add-ons**:
[👉 Add to Firefox](https://addons.mozilla.org/en-US/firefox/addon/myepiplus/)

---

### Manual installation (developer mode)

<details>
<summary>Chrome / Chromium</summary>

1. Download or clone this repository.
2. Open `chrome://extensions/`.
3. Enable **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the project folder.

</details>

<details>
<summary>Firefox</summary>

1. Download or clone this repository.
2. Open `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on...** and select the `manifest.json` file.

</details>

---

## Permissions

MyEpiPlus only requests access to `https://my.epitech.eu/*`. It reads your local authentication token to make API requests directly from your browser — no data is ever sent to external servers.

See the full [Privacy Policy](PRIVACY_POLICY.md) for details.

---

## Project Structure

```
MyEpiPlus/
├── icons/                  # Extension icons
├── popup/
│   ├── popup.html          # Extension popup UI
│   ├── popup.css           # Popup styles
│   ├── popup.js            # Popup logic
│   └── assets/             # Popup assets (logo, etc.)
├── scripts/
│   ├── content.js          # Content script (entry point)
│   └── grades.js           # Grade Addon logic
├── manifest.json           # Extension manifest (MV3)
└── PRIVACY_POLICY.md
```

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## Author

Made by [Ilan LP](https://github.com/Ilan-LP)

---

## License

See [LICENSE](LICENSE.md)
