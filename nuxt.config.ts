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
  },
};

export default defineNuxtConfig({
  css: [`@/layers/${runtimeConfig.deployedStore}/assets/css/global.css`],
  extends: ["./layers/" + runtimeConfig.deployedStore, "./layers/base"],
  devtools: { enabled: true },
  components: {
    global: true,
  },
  runtimeConfig: runtimeConfig,
});
