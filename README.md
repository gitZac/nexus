# Nexus

Nexus is a Nuxt 3 frontend that powers **multiple independently-branded sites from a single codebase**. Each site ("butterfly", "capybara", etc.) is deployed on its own, but they all share one set of pages, components, and data integrations. Content comes from a headless **Strapi** CMS and event listings come from the **Eventbrite** API; both are normalized on the server before they reach the Vue layer.

This started as an adaptation of the [Nuxt Layers multisite inheritance pattern](https://nuxt.com/docs/getting-started/layers) and has since grown into the real frontend for the Nexus brand family.

## Purpose

- **One codebase, many brands.** Shared UI, shared data-fetching logic, shared routing — each brand only overrides what actually differs for it (styling, a handful of components, fonts).
- **CMS-driven pages.** Page structure and content live in Strapi. The frontend fetches a page's component tree by slug and renders it dynamically (`DynamicRenderer.vue`), so editors can add/reorder sections without a frontend deploy.
- **Normalized data contracts.** `lib/shards/*` isolates each external API (Strapi, Eventbrite) behind a controller that fetches and reshapes data into the shapes the rest of the app expects, so the Vue components never talk to a third-party API directly.
- **Static-friendly routing.** The routes to prerender are generated at build time by querying Strapi for every known page/collection slug (`lib/shards/strapi/utils/generateStrapiRoutes.ts`), instead of being hand-maintained.

## How it works

### Layers

- `layers/base` is the shared foundation: pages, components, global styles, and the mock `product` API. Every brand inherits from it.
- `layers/<brand>` (currently `butterfly` and `capybara`) override only what's brand-specific — e.g. `layers/butterfly/components/Product.vue` replaces the base `Product.vue`, and each brand ships its own `global.css` / fonts.
- Which brand gets built is controlled by the `DEPLOYED_STORE` environment variable, which Nuxt uses to pick the `extends` order in `nuxt.config.ts`:

  ```
  # .env
  DEPLOYED_STORE=capybara
  ```

  Changing it requires a dev server restart.

### Data integrations (`lib/shards`)

- **Strapi** (`lib/shards/strapi`) — `StrapiApiController` queries collections/single types by slug, and `strapiSchemaMigrator` rewrites legacy/relative image schemas into the shape components expect. `generateStrapiRoutes` turns the current Strapi page list into the set of routes Nitro should prerender.
- **Eventbrite** (`lib/shards/eventbrite`) — `EventbriteApiController` resolves the configured organizer and fetches their events for the `event-data` API routes.

### Server routes (`server/api`)

- `page-data/strapi/[...path]` and `page-data/strapi/collection/[name]` expose Strapi-backed page/collection data to the frontend.
- `event-data/eventbrite/*` exposes Eventbrite-backed event data.

## Using this repo

### Install

```bash
npm install
```

### Configure environment

Create a `.env` with:

| Variable | Purpose |
| --- | --- |
| `DEPLOYED_STORE` | Brand to build (folder name under `layers/`, e.g. `butterfly`, `capybara`) |
| `STRAPI_API_BASE` | Base URL for the Strapi REST API |
| `STRAPI_URL_BASE` | Base URL used to resolve relative Strapi asset/image URLs |
| `EVENTBRITE_API_KEY` | Eventbrite API key |
| `EVENTBRITE_CLIENT_SECRET` | Eventbrite OAuth client secret |
| `EVENTBRITE_PRIVATE_TOKEN` | Eventbrite private token (server-side calls) |
| `EVENTBRITE_PUBLIC_TOKEN` | Eventbrite public token |
| `PAGE_DATA` / `EVENT_DATA` | Exposed to the client via `runtimeConfig.public` |

### Run

```bash
npm run dev       # http://localhost:3000, rebuilds for the selected DEPLOYED_STORE
npm run build      # production build
npm run generate   # static generation (prerenders Strapi-derived routes)
npm run preview    # preview a production build locally
```

### Adding a new brand

1. Create `layers/<brand>` with at least a `nuxt.config.ts` and `assets/css/global.css`.
2. Override only the files that differ from `layers/base` (components, server routes, styles).
3. Set `DEPLOYED_STORE=<brand>` and run/build as above.

## Roadmap

Near-term, actively tracked work:

- **Collection-type routing** — generalizing route generation so arbitrary Strapi collection types (not just `pages`) are discovered and prerendered correctly; a recent fix addressed a transformer bug here, but coverage is still incomplete.
- **Deployment automation** — scripted/CI-driven builds per brand (keyed off `DEPLOYED_STORE`) so each site can be deployed independently without manual env juggling.
- **Strapi schema migrator hardening** — extending `strapiSchemaMigrator` beyond image fields to cover other relation/media types as new component types are added in Strapi.
- **Error handling for external calls** — `strapiFetch` and `EventbriteApiController` currently log and swallow failures; callers get no signal when an upstream API is down, which needs surfacing (fallback UI, retries, or explicit error states).
- **Additional brand layers** beyond `butterfly` and `capybara` as new sites are onboarded.

## What's required for MVP

- [ ] At least one brand fully content-complete in Strapi and rendering end-to-end (pages + collections + events) with no mock data (`layers/base/server/api/product.ts` is still a hardcoded mock).
- [ ] Route generation reliably covers every page and collection type a brand needs, including nested/dynamic slugs.
- [ ] A documented, repeatable deployment path per brand (build command + env vars + hosting target).
- [ ] Basic resilience: the app shouldn't render a blank/broken page when Strapi or Eventbrite is unreachable.
- [ ] `.env.example` committed so new environments (and new brands) can be bootstrapped without reverse-engineering `nuxt.config.ts`.
- [ ] Minimal automated test coverage for the data-transformation layer (`strapiSchemaMigrator`, `StrapiApiController`, slug helpers), since these are the parts most likely to silently break content.

## Questions?

Open an issue in this repo.
