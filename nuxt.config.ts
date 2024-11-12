
export default defineNuxtConfig({
  extends: [
    './layers/' + process.env.DEPLOYED_STORE,
    './layers/base'
  ],
  devtools: { enabled: true }
})