---
title: "Building a Blog with Next.js and Markdown"
date: "2026-04-05"
description: "A technical walkthrough of how I built this blog using Next.js App Router, Markdown for content, and CSS custom properties for theming."
tags: ["nextjs", "markdown", "tutorial", "webdev"]
---

# Building a Blog with Next.js and Markdown

When I decided to build my personal blog, I had a few key requirements:

1. **SEO-friendly** — Static HTML pages with proper meta tags
2. **No CMS** — Write in Markdown, deploy via Git
3. **Dark/Light mode** — Respects system preferences
4. **Fast** — Static generation for instant page loads

## Project Structure

The blog follows a clean, modular structure:

```
blog/
├── app/           # Next.js App Router pages
├── components/    # Reusable React components
├── lib/           # Utilities (markdown parsing, config)
├── content/posts/ # Markdown blog posts
└── public/        # Static assets
```

## Markdown Processing

Each blog post is a `.md` file with YAML frontmatter:

```yaml
---
title: "Post Title"
date: "2026-04-05"
description: "SEO description"
tags: ["tag1", "tag2"]
---
```

The processing pipeline uses:
- **gray-matter** to parse frontmatter
- **remark** to convert Markdown to HTML
- **remark-gfm** for GitHub Flavored Markdown (tables, strikethrough, etc.)

## Theming with CSS Custom Properties

The dark/light mode system uses CSS custom properties (variables):

```css
:root {
  --bg-primary: #f1f5f9;
  --text-primary: #0f172a;
  --accent: #2563eb;
}

[data-theme="dark"] {
  --bg-primary: #0f172a;
  --text-primary: #e2e8f0;
  --accent: #f59e0b;
}
```

This approach means every component automatically adapts to the theme without any JavaScript recalculations.

## SEO Features

The blog includes comprehensive SEO:

| Feature | Implementation |
|---------|---------------|
| Meta tags | Next.js `metadata` export |
| Open Graph | Per-page OG tags |
| Structured Data | JSON-LD for blog posts |
| Sitemap | Auto-generated `sitemap.xml` |
| RSS Feed | Available at `/rss.xml` |
| Robots.txt | Allows all crawlers |

## Performance

Thanks to Next.js static generation, every page is pre-rendered at build time. This means:

- **Zero JavaScript** needed to render the initial page
- **Instant navigation** between pages
- **Perfect Lighthouse scores** out of the box

## Deployment

Deploying to Vercel is seamless:

1. Push to GitHub
2. Connect repo to Vercel
3. Every push auto-deploys

That's it! No build configuration needed.

---

*Want to build your own? Fork the repo and customize it to your liking!*
