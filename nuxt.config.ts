export default defineNuxtConfig({
  css: [`@/layers/${process.env.DEPLOYED_STORE}/assets/css/global.css`],
  extends: ["./layers/" + process.env.DEPLOYED_STORE, "./layers/base"],
  devtools: { enabled: true },
  components: {
    global: true,
  },
  runtimeConfig: {
    deployedStore: "capybara",
    eventbriteApiKey: "4QYDRBWCU4HACOCQVF",
    eventbriteClientSecret:
      "LMOPJVWZJ7PLZXIAZOK5JZUUUIS54XRHPTYSN3R4AIANEGACJQ",
    eventbritePrivateToken: "6VEWIYMPFNHWI3K6ZHKG",
    eventbritePublicToken: "URBVQ6FGEBPRKNKHP4TS",
    strapiApiBase: "http://localhost:1337/api",
    strapiUrlBase: "http://localhost:1337",
    public: {
      pageData: process.env.PAGE_DATA,
      eventData: process.env.EVENT_DATA,
    },
  },
});
