# 🔍 Zukunftstag Escape Game

A mobile-first detective-themed quiz game built with **Vite + React + TypeScript**.  
Answer 8 free-text questions to collect all puzzle pieces and solve the case!

## 🌐 Live Demo

**<https://bbodensieck.github.io/zukunftstag-escape-game/>**

Scan the QR code below to open the game directly on your phone:

![QR Code](public/qrcode.png)

## 🕹️ How to play

1. Read each question and type your answer into the text field.
2. Your answer is correct if it **contains** the right keyword (case-insensitive).  
   E.g. "eine Schlange", "Schlange", and "schlange" are all accepted for the keyword *Schlange*.
3. Collect all 8 puzzle pieces to reveal the solution and solve the case!

## 🛠️ Development

```bash
npm install
npm run dev      # start dev server
npm run build    # production build → dist/
npm run lint     # ESLint
```

## 🚀 Deployment

The site deploys automatically to GitHub Pages on every push to `main` via the workflow in `.github/workflows/deploy.yml`.  
Enable it once under **Settings → Pages → Source: GitHub Actions**.
