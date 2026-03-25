# 🚀 System Design Builder — SDLC Simulation Engine v2.0

An interactive, industry-style system design simulation platform that teaches full SDLC decision impact, architecture tradeoffs, and real-world failure patterns.

## Features

- 5 real-world scenarios (Instagram, Chat App, E-Commerce, Video Streaming, Ride Sharing)
- 5 SDLC models with simulation impact
- Architecture component builder (Load Balancer, Cache, CDN, API Gateway, Message Queue, Microservices)
- Advanced DB simulation (SQL, NoSQL, Distributed DB)
- 4 testing strategies + 4 deployment strategies
- Real-time metrics dashboard (latency, error rate, cache hit rate, DB response time)
- Event log with timestamps
- 5-cycle game loop — survive to win!
- Cost model per component
- Smart feedback engine

---

## 🖥️ Running Locally

### Prerequisites

Make sure you have **Node.js** installed (version 16 or higher).

👉 Download from: https://nodejs.org (choose the LTS version)

To verify installation, open your terminal and run:
```
node --version
npm --version
```

---

### Step 1 — Install dependencies

Open a terminal, navigate to this project folder, then run:

```bash
npm install
```

This installs React and all required packages into a `node_modules/` folder. Takes ~1–2 minutes.

---

### Step 2 — Start the development server

```bash
npm start
```

Your browser will automatically open at **http://localhost:3000**

The app hot-reloads — any changes you save will instantly appear in the browser.

---

### Step 3 — Build for production (optional)

```bash
npm run build
```

This creates an optimized `/build` folder you can deploy to any static host (Netlify, Vercel, GitHub Pages, etc.)

---

## 📤 Uploading to GitHub

### Step 1 — Install Git

Download from: https://git-scm.com/downloads

Verify with: `git --version`

---

### Step 2 — Configure Git (first time only)

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

---

### Step 3 — Create a repo on GitHub

1. Go to https://github.com
2. Click the **+** icon → **New repository**
3. Name it `system-design-builder`
4. Leave it **Public** (or Private)
5. Do NOT tick "Add README" (we already have one)
6. Click **Create repository**

---

### Step 4 — Push your code

Inside your project folder, run these commands one by one:

```bash
git init
git add .
git commit -m "Initial commit — System Design Builder v2.0"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/system-design-builder.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

### Step 5 — Deploy to GitHub Pages (optional, free hosting)

Install the GitHub Pages package:

```bash
npm install --save-dev gh-pages
```

Add these two lines to `package.json`:

At the top level, add:
```json
"homepage": "https://YOUR_USERNAME.github.io/system-design-builder",
```

Inside `"scripts"`, add:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

Then deploy with:
```bash
npm run deploy
```

Your app will be live at: `https://YOUR_USERNAME.github.io/system-design-builder`

---

## 📁 Project Structure

```
system-design-builder/
├── public/
│   └── index.html          # HTML shell
├── src/
│   ├── index.js            # React entry point
│   └── App.jsx             # Main app (all logic + UI)
├── .gitignore
├── package.json
└── README.md
```

---

## 🎮 How to Play

1. **Choose a scenario** — each has different traffic patterns and difficulty
2. **Pick your SDLC model** — affects bug risk and deployment speed
3. **Set requirements** — tradeoffs between performance, cost, reliability
4. **Design your architecture** — toggle components; each has a cost
5. **Choose testing + deployment strategy**
6. **Run simulation** — survive 5 cycles without crashing to win!

---

Built with React 18 · No backend · No external APIs
