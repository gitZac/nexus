export default defineNuxtConfig({
  css: [`@/layers/${process.env.DEPLOYED_STORE}/assets/css/global.css`],
  extends: ["./layers/" + process.env.DEPLOYED_STORE, "./layers/base"],
  devtools: { enabled: true },
  components: {
    global: true,
  },
});
