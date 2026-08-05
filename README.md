# Insurance Marketing Hub (IMH) 🛡️✨

> **Create, Personalize & Share Professional Insurance Marketing Designs in Seconds**

Insurance Marketing Hub (IMH) is an enterprise-grade commercial SaaS platform designed specifically for Insurance Advisors, Agents, Development Officers, Branch Managers, Financial Consultants, and Corporate Sales Teams.

---

## 🚀 Key Features & Capabilities

### 🎨 **React-Konva Graphics Personalization Engine**
- **2D Canvas Layer Compositor**: Add, edit, drag, transform, lock, hide, and reorder text layers, photo/logo images, and shape containers.
- **Single-Click Brand Kit Auto-Apply**: Upload photo, company logo, name, designation, phone, email, website, branch, and brand colors once. Click **"Auto-Apply Brand Kit"** to instantly personalize any poster.
- **Multi-Format High DPI Exports**: Export in **PNG**, **JPG**, and **PDF** formatted for:
  - Instagram Post (1080x1080)
  - Instagram / WhatsApp Story (1080x1920)
  - Facebook Post (1200x630)
  - LinkedIn Banner (1080x1350)

### 💼 **Agent Portal & Enterprise Admin Panel**
- **Agent Dashboard**: Uncluttered, advisor-focused dashboard featuring personal branding settings, saved drafts, download history, and favorite templates.
- **Admin Control Center**: Enterprise dashboard with live metrics, system health, template library management, user role controls, and audit logs.

### 🌐 **Full Public Suite & Marketing Infrastructure**
- **Pages**: Home (with live Before/After personalization comparison), Templates catalog, Template Details, Categories, Pricing (Free, Pro, Agency, Enterprise tiers), Blog, FAQ, Careers, Contact, and Legal Suite (Privacy, Terms, Refund, Cookie, Disclaimer).
- **Dark Mode Default (`#0B1220`)**: Seamless light theme toggle with system preferences memory.
- **PWA & Offline Support**: Progressive Web App with Service Worker caching (`sw.js`) and manifest configuration.

---

## 🛠️ Tech Stack

- **Framework**: Vite + React 18/19 + TypeScript
- **Canvas Renderer**: React-Konva + Konva
- **Styling**: Tailwind CSS + Custom Glassmorphism
- **Routing**: React Router DOM (Cloudflare Pages SPA ready via `_redirects`)
- **Icons & Animations**: Lucide React + Framer Motion
- **Services**: Firebase (Auth, Firestore, Storage)
- **Deployment & Hosting**: GitHub Repository + Cloudflare Pages Edge Network

---

## 📁 Directory Structure

```
src/
├── components/
│   ├── layout/       # Navbar, Footer
│   ├── common/       # ToastContainer, Breadcrumbs, SearchModal
│   ├── templates/    # TemplateCard component
│   └── editor/       # CanvasStage, Toolbar, LeftSidebar, RightSidebar
├── pages/
│   ├── public/       # Home, Templates, TemplateDetail, Categories, Pricing, About, Contact, FAQ, Blog, Careers
│   ├── auth/         # AuthPages (Login, Register, Forgot Password)
│   ├── dashboard/    # AgentDashboard
│   ├── admin/        # AdminDashboard
│   ├── editor/       # PersonalizationStudioPage
│   └── legal/        # LegalPages (Privacy, Terms, Refund, Cookie, Disclaimer)
├── services/         # Firebase initialization & fallback handlers
├── context/          # ThemeContext, AuthContext, BrandKitContext, TemplateContext
├── types/            # Domain TypeScript interfaces
├── data/             # Mock templates, categories, blogs, and admin dataset
├── App.tsx           # Application route definitions
├── index.css         # Design system tokens & glassmorphism
└── main.tsx          # React application entry point
```

---

## 💻 Local Development Setup

### 1. Prerequisites
Ensure you have **Node.js 18+** installed.

### 2. Installation & Run
```bash
# Clone the repository
git clone https://github.com/your-username/insurance-marketing-hub.git
cd insurance-marketing-hub

# Install dependencies
npm install --legacy-peer-deps

# Run local dev server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deployment on Cloudflare Pages (via GitHub)

This application is fully optimized for **Cloudflare Pages static hosting** with automatic git deployments.

### Step 1: Push Project to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Production-ready Insurance Marketing Hub"
git branch -M main
git remote add origin https://github.com/your-username/insurance-marketing-hub.git
git push -u origin main
```

### Step 2: Connect Cloudflare Pages
1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages**.
2. Click **Create Application** > **Pages** > **Connect to Git**.
3. Select your GitHub repository (`insurance-marketing-hub`).
4. Configure Build Settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
5. Add Environment Variables (optional for custom Firebase keys):
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
6. Click **Save and Deploy**.

Cloudflare Pages will automatically build and publish your web app with instant Brotli compression and global CDN caching.

---

## 📄 License
MIT License. See [LICENSE](LICENSE) for details.
