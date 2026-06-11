# One More Option

A simple dark Next.js and Tailwind CSS landing page for a personal record/community.

> 福岡で暮らす一人の会社員が、自分と家族のためにもう一つの選択肢を作っていく記録。

## Pages

- Home

## Community URL

The current placeholder is defined in:

```text
components/content.tsx
```

Update `COMMUNITY_URL` when the paid community page is ready.

## Create the GitHub repository

If you have Git and the GitHub CLI installed and authenticated:

```bash
git init
git add .
git commit -m "Initial website"
git branch -M main
gh repo create one-more-option --public --source=. --remote=origin --push
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
