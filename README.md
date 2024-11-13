# Nuxt Multisite Inheritance Example

This emplate shows how to approach a problem of unifying multiple applications with a sginificant amount of shared functionalities on the UI/feature layer.

The goal of this template is to reuse as much as possible from the *base* application that is a common part and then easily override/extend the differentiating parts per site.

The example shows how to deploy **multiple applications from a single codebase**, rather than using a single application instance to serve multiple sites.

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

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
