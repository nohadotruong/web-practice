# Time Tracking Dashboard

This project is based on the [Frontend Mentor Challenge](https://www.frontendmentor.io/challenges/time-tracking-dashboard-UIQ7167Jw) — the goal is to recreate the dashboard UI according to the given design, make it responsive, and display data from the `data.json` file.

## ✨ Features

- Responsive layout for both mobile and desktop
- Hover states for interactive elements
- Switch between **Daily**, **Weekly**, and **Monthly** stats
- Previous period text changes according to the selected mode:

  - Daily → "Yesterday - Xhrs"
  - Weekly → "Last Week - Xhrs"
  - Monthly → "Last Month - Xhrs"

## 📂 Folder Structure

```
/app
  /components    # Components such as Card, UserProfile
  page.tsx       # Main page
/data
  data.json      # Stats data
/public/images   # Assets from Frontend Mentor
/globals.css
/tailwind.config.js
```

## 🚀 Installation & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🛠 Technologies Used

- [Next.js](https://nextjs.org/) — React framework
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Frontend Mentor Assets](https://www.frontendmentor.io) — Design & assets

## 📦 Deployment

Easily deploy the project on [Vercel](https://vercel.com/):

```bash
vercel
```

Or build manually:

```bash
npm run build
npm start
```
