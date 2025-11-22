import StrapiApiController from "~/lib/shards/strapi/StrapiApiController";
const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  // const queryParams = getQuery(event);
  const queryParams = {
    collection: "pages",
    slug: event.context.matchedRoute.params.path,
  };

  // console.log(queryParams);

  // console.log(event.context.matchedRoute.params.path);
  const config = {
    apiBase: runtimeConfig.strapiApiBase,
  };

  const strapi = new StrapiApiController(queryParams, config);
  const pageData = await strapi.queryCollectionDataBySlug();

  return {
    hello: "hello",
    test: "test",
    route: event.context.matchedRoute.params.path,
    ...pageData,
  };
});
