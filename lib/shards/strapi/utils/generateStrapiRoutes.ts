import StrapiApiController from "./../StrapiApiController";
import { getSlugListFromArrayAndFormat } from "./../../../../utils/useSlugHelpers";

export const generateStrapiRoutes = async () => {
  const generatedPageRoutes: any = [];
  const strapi = new StrapiApiController();
  const pages = await strapi.queryEntireCollection(false, "pages");
  const globalSettings = await strapi.queryEntireCollection(true, "global");

  const registeredSingleTypes =
    strapi.getRegisteredSingleTypeRoutes(globalSettings);

  const routeList = getSlugListFromArrayAndFormat(pages);

  routeList.forEach((route: any) => {
    generatedPageRoutes.push(route.apiSlug);
    generatedPageRoutes.push(route.pageSlug);
  });

  return [...generatedPageRoutes, ...registeredSingleTypes];
};
