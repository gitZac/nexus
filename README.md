# Nuxt Multisite Inheritance Example

This template shows how to approach a problem of unifying multiple applications with a sgnificant amount of shared functionalities on the UI/feature layer.

The goal of this template is to reuse as much as possible from the *base* application that is a common part and then easily override/extend the differentiating parts per site.

The example shows how to build **multiple applications deployed separately from a single codebase**, rather than using a single application instance to serve multiple sites (multitenancy).

Some examples on where this could be useful:
- Multi-brand eCommerce setups 
- Multi-channel applications (web, mobile, kiosk etc)
- Multi-tenant applications (with some slight adjustments)

This is a simplified version of what we developed at [Alokai](https://alokai.com) as a solution for large eCommerce companies with complex frontend applications.

## How it works?

The mechanism here is quite simple and based on the inheritance mechanism coming from Nuxt Layers.

- The *core* logic being a common piece that can be shared across multiple sites is placed in the `layers/base` folder.
- Every file you put in a different folder within `layers` directory will override the base one (keep in mind that relative paths are still pointing to the layer where the file is placed)

You change the site by changing the `DEPLOYED_STORE` environment variable and setting it to the name of the folder within `layers` directory you want to deploy.

eg. `DEPLOYED_STORE=butterfly` will deploy the `butterfly` site.

## What's included

- File inheritance for all nuxt directories and files using layers
- Layer-specific features (`layers/butterfly/components/Product.vue`)
- Global CSS override example with variables (`assets/css/variables.css`)
- Example on how to use the same codebase and template swith different underlying data models coming from different API's using normalizers (`server/api/*)`


## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Prequisite

Choose the site you want to develop or build. Keep in mind that you might need to reload the dev server when you change it.

Use the name of the directory from the `layers` folder instead of `{layer-name}`
```
//.env
DEPLOYED_STORE={layer-name}
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Questions?

Just ping me on [Bluesky](https://bsky.app/profile/filrakow.ski), [X](https://x.com/filrakowski), [Linkedin](https://www.linkedin.com/in/filip-rakowski-a43671129/) or create an issue in this repo if you think others would benefit from having the answer to that questions being posted in public.
