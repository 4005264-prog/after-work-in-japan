# after work in japan

A complete dark-theme Next.js and Tailwind CSS website for a personal record:

> A Japanese office worker's notes from work, family, and the hours after.

## Pages

- Home
- About
- Read
- Quiet Room

## Create the GitHub repository

If you have Git and the GitHub CLI installed and authenticated:

```bash
git init
git add .
git commit -m "Initial website"
git branch -M main
gh repo create after-work-in-japan --public --source=. --remote=origin --push
```

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deploy

This repository is ready for GitHub Pages. After pushing to `main`, enable GitHub Pages in
the repository settings and choose **GitHub Actions** as the source. The included workflow
builds the static Next.js site and publishes the `out` directory.

For other hosts such as Vercel or Netlify, use `npm run build`.
