export const generatePageSlugFromRoute = (routePath: string) => {
  let pageSlug = "";
  const split = routePath.split("/") || "/";
  split.shift();

  if (split.length && split[0] !== "") {
    pageSlug = split[split.length - 1];
  } else {
    pageSlug = "/";
  }

  return pageSlug;
};
