import StrapiApiController from "~/lib/shards/strapi/StrapiApiController";

export default defineEventHandler(async (event) => {
  const queryParams = getQuery(event);
  const config = {
    apiBase: process.env.STRAPI_API_BASE,
  };

  const strapi = new StrapiApiController(queryParams, config);
  const pageData = await strapi.queryCollectionDataBySlug();

  return {
    ...pageData,
  };
});
