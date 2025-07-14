import StrapiApiController from "~/lib/shards/strapi/StrapiApiController";
const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const queryParams = getQuery(event);
  const config = {
    apiBase: runtimeConfig.strapiApiBase,
  };

  const strapi = new StrapiApiController(queryParams, config);
  const pageData = await strapi.queryCollectionDataBySlug();

  return {
    ...pageData,
  };
});
