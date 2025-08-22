# Astro Starter Kit: Blog

[![Deployed on Cloudflare Pages](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Pages-f38020?logo=cloudflare&logoColor=white)](https://frankpigeon.com)

```sh
npm create astro@latest -- --template blog
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 📋 Prerequisites

- **Node.js** - v22.0.0 or higher (defined in `.nvmrc`)
- **npm/pnpm/yarn** - Package manager
- Use `nvm use` to automatically switch to the correct Node.js version

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Image Dimensions

For optimal display and performance, use these recommended image dimensions:

| Image Type                | Dimensions | Aspect Ratio | Usage                        |
| ------------------------- | ---------- | ------------ | ---------------------------- |
| Blog header images (hero) | 960×480px  | 2:1          | Individual blog post headers |
| Blog list thumbnails      | 960×480px  | 2:1          | Blog listing page thumbnails |
| OpenGraph/Social sharing  | 1200×630px | 1.91:1       | Social media previews        |
| Page content width        | 960px max  | -            | Main content container       |

_Note: These dimensions match the blog-placeholder images included with the template. The Astro Image component will automatically resize and optimize images as needed._

Images should be placed in `src/assets/` for optimization or `public/` for direct serving without processing.

## 🌐 OpenGraph & Social Sharing

This blog automatically generates OpenGraph meta tags for better social media sharing:

### How It Works
- **Default image**: `sunset.webp` is used as the fallback OpenGraph image
- **Blog posts**: Use their `heroImage` from frontmatter for social previews
- **Pages**: Use their `heroImage` from frontmatter, or fall back to default

### Adding OpenGraph Images
1. **For blog posts**: Add `heroImage: "../../assets/your-image.webp"` to frontmatter
2. **For pages**: Add `heroImage: ../assets/your-image.webp` to frontmatter
3. **Change default**: Update `FallbackImage` import in `src/components/BaseHead.astro`

### Testing Social Previews
- **Facebook**: [Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Twitter**: [Card Validator](https://cards-dev.twitter.com/validator)
- **LinkedIn**: [Post Inspector](https://www.linkedin.com/post-inspector/)

### Optimal Image Sizes
- OpenGraph images work best at **1200×630px** (1.91:1 ratio)
- Minimum size: 600×315px
- Maximum file size: Keep under 1MB for best performance

## 📁 Asset Management

Understanding Astro's asset handling is crucial for proper file placement:

### `src/assets/` - Processed Assets

- Files are optimized, compressed, and get hashed filenames (e.g., `image.abc123.webp`)
- Perfect for images imported in components or referenced in markdown
- Astro automatically optimizes and serves these efficiently

### `public/` - Static Assets

- Files are served directly at root URL without processing
- Required for files that need predictable URLs or can't be imported
- Use for: videos, PDFs, downloadable files, favicons

### Video Files

Videos in markdown `<video>` elements **must** be placed in `public/` because:

- Video elements need direct, unchanging URL paths
- Markdown can't use Astro's import syntax
- Reference with absolute paths: `<source src="/video.mp4">`

**Example:**

```html
<!-- Correct: Video in public/ folder with accessibility attributes -->
<video
  autoplay
  loop
  muted
  playsinline
  aria-label="Demonstration of Windows 10 debloat script removing bloatware and unwanted applications"
>
  <source src="/Win10DebloatRight.webm" type="video/webm" />
  <source src="/Win10DebloatRight.mp4" type="video/mp4" />
  Your browser does not support the video tag. This video demonstrates the
  Windows 10 debloat script removing bloatware applications.
</video>
```

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
