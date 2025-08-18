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

- **Node.js** - v18.20.8, v20.3.0, or v22.0.0 or higher (v19 and v21 are not supported)
- **npm/pnpm/yarn** - Package manager
- Use `nvm use` to automatically switch to the correct Node.js version (defined in `.nvmrc`)

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
| Page content width        | 960px max  | -            | Main content container       |

_Note: These dimensions match the blog-placeholder images included with the template. The Astro Image component will automatically resize and optimize images as needed._

Images should be placed in `src/assets/` for optimization or `public/` for direct serving without processing.

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
