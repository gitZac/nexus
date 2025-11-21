import StrapiApiController from "~/lib/shards/strapi/StrapiApiController";
const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  if (!event) return "northing here";

  const collection = "pages";
  const slug = event?.context?.matchedRoute?.params?.path;

  const queryParams = {
    collection: collection,
    slug: slug == collection ? "/" : slug,
  };

  const config = {
    apiBase: runtimeConfig.strapiApiBase,
  };

  const strapi = new StrapiApiController(queryParams, config);
  const pageData = await strapi.queryCollectionDataBySlug();

  return {
    queryParams,
    ...pageData,
  };
});
