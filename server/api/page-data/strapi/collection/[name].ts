import StrapiApiController from "~/lib/shards/strapi/StrapiApiController";
export default defineEventHandler(async (event) => {
  const collection = event?.context?.params?.name || "";
  const isDeep = true;
  const strapi = new StrapiApiController();
  const pageData = await strapi.queryEntireCollection(isDeep, collection);
  return {
    ...pageData,
  };
});
