export const strapiSchemaMigrator = {
  image: (oldSchema: any) => {
    if (!oldSchema) return;

    return {
      name: oldSchema.name,
      alt: oldSchema.alternativeText,
      url: `${process.env.STRAPI_URL_BASE}${oldSchema.url}`,
    };
  },
};
