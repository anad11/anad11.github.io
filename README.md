## Ana Dimitrievska — Portfolio

A personal portfolio built with React and Vite, featuring project work, professional experience, and contact links.

## Development

Install the locked dependencies and start the local development server:

```sh
npm ci
npm run dev
```

## Validation and production build

```sh
npm run lint
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Updating portfolio content

- Project copy and media paths: `src/data/projects.js`
- Work experience: `src/data/experience.js`
- Static images, videos, and downloadable documents: `public/`

Use browser-supported video formats such as H.264 MP4 or WebM for the broadest playback support.

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` runs lint and build checks, then publishes `dist/` to GitHub Pages when changes are pushed to `main`.
