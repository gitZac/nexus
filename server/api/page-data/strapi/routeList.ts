import StrapiApiController from "~/lib/shards/strapi/StrapiApiController";
import { getSlugListFromArrayAndFormat } from "~/utils/useSlugHelpers";
const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async () => {
  const collection = "pages";

  const config = {
    apiBase: runtimeConfig.strapiApiBase,
  };

  const strapi = new StrapiApiController(
    {
      collection: "pages",
      slug: "",
    },
    config
  );

  const data = await strapi.queryEntireCollection(false, collection);

  const routeList = getSlugListFromArrayAndFormat(data);

  return {
    data,
    routeList,
  };
});
