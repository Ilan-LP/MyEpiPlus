# Privacy Policy — MyEpiPlus

**Last updated:** February 25, 2026

## Overview

MyEpiPlus is a browser extension that enhances the interface of [my.epitech.eu](https://my.epitech.eu). This policy explains what data is accessed, how it is used, and what is never collected.

---

## Data Accessed

### Authentication Token
MyEpiPlus reads the authentication token stored in the `localStorage` of `my.epitech.eu`. This token is used **solely** to make authenticated API requests to `my.epitech.eu` on your behalf (e.g., fetching your grades).

### API Requests
The extension makes HTTP requests exclusively to the following endpoints:
- `https://my.epitech.eu/api/auth/verify`
- `https://my.epitech.eu/api/evaluations/validations/me`
- `https://my.epitech.eu/api/evaluations/validations/alerts/me`

These requests are made **directly from your browser** to `my.epitech.eu`. No data passes through any third-party server.

---

## Data We Do NOT Collect

- We do **not** collect, store, or transmit any personal data to external servers.
- We do **not** share any information with third parties.
- We do **not** use analytics, tracking, or telemetry of any kind.
- We do **not** store any data outside of your browser session.

---

## Permissions Used

| Permission | Reason |
|---|---|
| `host_permissions: my.epitech.eu/*` | Required to inject the content script and make authenticated API requests |

---

## Contact

If you have any questions about this privacy policy, you can open an issue on the [GitHub repository](https://github.com/Ilan-LP/MyEpiPlus/issues).
