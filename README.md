# Deadlock Learning Guide

This is a [Next.js](https://nextjs.org) project designed to help players master the game mechanics of Deadlock.

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📚 Adding a New Guide

You can easily add new guides without writing code using our Markdown-to-JSON system.

### 1. Create the Guide File
Copy the template file `guides/TEMPLATE.md` to a new file, for example `guides/my-new-guide.md`.

### 2. Edit Content
Open your new file and fill in the metadata and sections.
- **Metadata**: Top of the file (Title, ID, Description).
- **Sections**: Use `## Section X` headers.
- **Media**: Add YouTube links or Image paths under `### Media`.

Example format:
```markdown
# Guide Metadata
ID: my-guide
Title: My Great Guide
Order: 5
---
## Section 1: Introduction
### Content
Explain your topic here.
### Media
- YouTube: https://youtu.be/...
```

### 3. Import the Guide
Run the import script to add it to the app:

```bash
npm run add-guide guides/my-new-guide.md
```

This will automatically update `public/data/guides.json`.

## 🛠 Tech Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **TypeScript**
- **LocalStorage** for persistence

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).
