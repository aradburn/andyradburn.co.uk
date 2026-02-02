# Andy Radburn

Modern static site built with **Next.js 14** and **Tailwind CSS**, converted from Jekyll. Deployable to GitHub Pages.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build (static export)

```bash
npm run build
```

Output is in `out/`. The build script copies `assets/` into `public/assets/` so images and favicons are included.

## Deploy to GitHub Pages

1. In repo **Settings → Pages**: set **Source** to **GitHub Actions**.
2. A workflow at `.github/workflows/deploy.yml` runs on push to `main` or `dev`: it builds the site and deploys the `out/` directory.
3. `public/CNAME` (custom domain) and `public/.nojekyll` are copied into the export. For a custom domain, add a **CNAME** record pointing to `username.github.io`.

## Content

- **Site data**: `_data/menu.yml`, `_data/metaData.yml`
- **Posts**: Markdown in `dubbal/_posts/`, `sonicarcana/_posts/`, `bubbledubble/_posts/`
- **Static pages**: `app/about/`, `app/cookies/`, `app/privacy-policy/`

Legacy Jekyll folders (`_config.yml`, `_layouts/`, `_includes/`, `_sass/`, etc.) remain for reference but are not used by the Next.js build.
