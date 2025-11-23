import StrapiApiController from "~/lib/shards/strapi/StrapiApiController";
export default defineEventHandler(async (event) => {
  const collection = "main-nav";
  const isDeep = true;
  const params = {
    collection: collection,
  };

  const strapi = new StrapiApiController(params);
  const pageData = await strapi.queryEntireCollection(isDeep, collection);

  return {
    ...pageData,
  };
});
