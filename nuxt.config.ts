import { generateStrapiRoutes } from "./lib/shards/strapi/utils/generateStrapiRoutes";
import svgLoader from "vite-svg-loader";

const runtimeConfig = {
  deployedStore: process.env.DEPLOYED_STORE,
  eventbriteApiKey: process.env.EVENTBRITE_API_KEY,
  eventbriteClientSecret: process.env.EVENTBRITE_CLIENT_SECRET,
  eventbritePrivateToken: process.env.EVENTBRITE_PRIVATE_TOKEN,
  eventbritePublicToken: process.env.EVENTBRITE_PUBLIC_TOKEN,
  strapiApiBase: process.env.STRAPI_API_BASE,
  strapiUrlBase: process.env.STRAPI_URL_BASE,
  public: {
    pageData: process.env.PAGE_DATA,
    eventData: process.env.EVENT_DATA,
    strapiUrlBase: process.env.STRAPI_URL_BASE,
  },
};

const generatedPageRoutes = await generateStrapiRoutes();
generatedPageRoutes.push("/api/event-data/eventbrite/events");

export default defineNuxtConfig({
  css: [
    `@/layers/base/assets/scss/main.scss`,
    `@/layers/${runtimeConfig.deployedStore}/assets/css/global.css`,
    `@/layers/${runtimeConfig.deployedStore}/assets/scss/main.scss`,
  ],
  extends: ["./layers/" + runtimeConfig.deployedStore, "./layers/base"],
  devtools: { enabled: true },
  components: {
    global: true,
  },
  runtimeConfig: runtimeConfig,
  nitro: {
    prerender: {
      routes: generatedPageRoutes,
    },
  },
  vite: {
    plugins: [svgLoader()],
  },
});
