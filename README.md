# 🎓 IDPS Extension - Unilorin Phishing Detection

A browser extension designed to protect students and staff of the **University of Ilorin** from phishing social engineering attacks.

![GitHub last commit](https://img.shields.io/github/last-commit/Zeeohn/idps-extension)
![GitHub manifest version](https://img.shields.io/badge/version-1.0-blue)

## 🔍 Overview

This extension actively monitors the web pages you visit and uses logo detection technology to identify fake versions of the University of Ilorin portal. When a suspected phishing site is detected, it alerts you and disables input fields to prevent you from entering sensitive information like your matriculation number and password.
You can find the research document here: ![Thesis Research](https://docs.google.com/document/d/1IFe55oy84ha-Bn53N2lvmeCMy2Zn35bOFMwU-T7NaSw/edit?usp=sharing)

## ✨ Features

- **Automated Phishing Detection** – Scans images on visited pages to detect the University of Ilorin logo.
- **Instant Alerts** – Displays a browser notification warning you when a phishing site is detected.
- **Input Field Protection** – Automatically disables all input fields on suspected phishing pages to prevent credential theft.
- **Targeted Protection** – Specifically designed to protect the University of Ilorin portal (`uilugportal.unilorin.edu.ng`).

## 🛠️ How It Works

1. **Logo Detection** – The extension scans all images (including background images) on the page and uses the [Eden AI](https://www.edenai.co/) logo detection API to identify if the University of Ilorin logo is present.
2. **Page Verification** – If the logo is detected on a page that is **not** the official university portal, the extension flags it as a phishing attempt.
3. **User Alert** – A notification is shown warning you about the phishing site, with a link to the official portal.
4. **Input Lockdown** – All input fields on the page are disabled to prevent you from accidentally submitting your credentials.

## 📁 Project Structure

idps-extension/
├── images/                 # Extension icons (16px, 32px, 48px, 128px)
├── popup/
│   ├── hello.html          # Popup UI when clicking the extension icon
│   └── popup.js            # Popup script
├── scripts/
│   ├── content.js          # Content script – scans images and disables inputs
│   └── service-worker.js   # Background service worker – manages navigation and notifications
├── index.html              # Example phishing page (for demonstration)
└── manifest.json           # Extension manifest (Manifest V3)

## 🚀 Installation

### From Source (Developer Mode)

1. Clone this repository:
   ```bash
   git clone https://github.com/Zeeohn/idps-extension.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the `idps-extension` folder.
5. The extension is now installed and active!

### From Chrome Web Store

*(Not currently published – follow the source installation steps above.)*

## ⚙️ Configuration

The extension is pre-configured to protect the following URLs:

| URL | Purpose |
|-----|---------|
| `https://uilugportal.unilorin.edu.ng/login.php` | Official University of Ilorin portal |
| `https://uilugportal-unilorin-edu.000webhostapp.com/` | Example phishing site (for demonstration) |

To add more protected URLs, update the `matches` array in `manifest.json` under `content_scripts`.

## 📝 Permissions

The extension requires the following permissions:

- `webNavigation` – To detect when a page loads and trigger a scan.
- `tabs` – To communicate with the active tab.
- `activeTab` – To access the current page's content.
- `notifications` – To display phishing warnings.

## ⚠️ Disclaimer

This extension is an **educational and protective tool** developed for the University of Ilorin community. It relies on third-party APIs (Eden AI) for logo detection and should not be considered a comprehensive security solution. Always exercise caution when entering personal information online.


