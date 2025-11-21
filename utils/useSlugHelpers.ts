export const generatePageSlugFromRoute = (routePath: string) => {
  let pageSlug = "";
  const split = routePath.split("/") || "/";
  split.shift();

  if (split.length && split[0] !== "") {
    pageSlug = split[split.length - 1];
  } else {
    pageSlug = "home";
  }

  return pageSlug;
};

export const getSlugListFromArrayAndFormat = (arr) => {
  const slugs = arr.map((item) => {
    const apiSlug = `/api/page-data/strapi/${item.slug}`;
    const pageSlug = `/${item.slug}`;
    return {
      apiSlug,
      pageSlug,
    };
  });
  return slugs;
};
