# Cloudflare Pages & GitHub Deployment Guide 🚀

This document details how to deploy **Insurance Marketing Hub (IMH)** to **Cloudflare Pages** backed by a **GitHub Repository**.

---

## 1. Cloudflare Pages Architecture

- **Hosting Platform**: Cloudflare Pages Edge CDN
- **Build Output Directory**: `dist`
- **Build Command**: `npm run build`
- **SPA Rewrite Rule**: `public/_redirects` (`/* /index.html 200`)
- **Backend Services**: Firebase Authentication, Firestore, and Firebase Storage

---

## 2. Environment Variables Configuration

In your **Cloudflare Pages Project Settings** under **Settings > Environment Variables**, add the following variables for production:

| Variable Name | Description | Example / Value |
|---|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase API Key | `AIzaSy...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | `imh-app.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID | `imh-app` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | `imh-app.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Sender ID | `123456789012` |
| `VITE_FIREBASE_APP_ID` | Firebase App ID | `1:123456789012:web:abcdef` |

*Note: If environment variables are omitted, the application uses built-in graceful fallback credentials so the interface remains fully operational.*

---

## 3. Step-by-Step GitHub & Cloudflare Deployment

### Step A: Push to GitHub
```bash
git init
git add .
git commit -m "Deploy Insurance Marketing Hub to Cloudflare Pages"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/insurance-marketing-hub.git
git push -u origin main
```

### Step B: Connect Cloudflare Pages
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) > **Workers & Pages**.
2. Select **Create Application** > **Pages** > **Connect to Git**.
3. Select your repository `insurance-marketing-hub`.
4. Set Build Configurations:
   - **Preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**.

---

## 4. SPA Route Rewrites Verification

The file `public/_redirects` contains:
```txt
/* /index.html 200
```
This ensures that direct URLs (e.g. `https://your-domain.pages.dev/templates`, `/dashboard`, `/admin`, `/pricing`) resolve cleanly to `index.html` without returning 404 errors.

---

## 5. Firebase Security Rules Setup

### Firestore Rules (`firestore.rules`)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /templates/{templateId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.role == 'admin';
    }
    match /brandkits/{brandKitId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Storage Rules (`storage.rules`)
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /avatars/{allPaths=**} {
      allow read;
      allow write: if request.auth != null;
    }
    match /logos/{allPaths=**} {
      allow read;
      allow write: if request.auth != null;
    }
  }
}
```
