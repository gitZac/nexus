import StrapiApiController from "~/lib/shards/strapi/StrapiApiController";
export default defineEventHandler(async (event) => {
  if (!event) return "nothing here";

  const collection = "pages";
  const slug = event?.context?.matchedRoute?.params?.path;

  const strapi = new StrapiApiController();
  const pageData = await strapi.queryCollectionDataBySlug(
    collection,
    slug == collection ? "/" : slug
  );

  return {
    ...pageData,
  };
});
