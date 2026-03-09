import { strapiFetch } from "./utils/strapiFetch";

export default class StrapiApiController {
  config = {
    apiBase: process.env.STRAPI_API_BASE,
    urlBase: process.env.STRAPI_URL_BASE,
  };

  constructor() {}

  async queryCollectionDataBySlug(collection: string, slug: string) {
    const url = `${this.config.apiBase}/${collection}?filters[slug]=${slug}&pLevel`;
    const data = await strapiFetch(url);

    return this._transformComponentData(data);
  }

  async queryEntireCollection(isDeep: Boolean, collection: String) {
    const deepParam = isDeep ? "?pLevel" : "";
    const url = `${this.config?.apiBase}/${collection}${deepParam}`;

    return await strapiFetch(url);
  }

  _transformComponentData(payload: any) {
    const transformed = payload.map((d: any) => {
      const components = d.components.map((component: any) => {
        const componentName = this._getFormattedComponentName(
          component.__component,
        );

        const imageSchemaTransformed =
          this._filterAndTransformImageSchema(component);

        return {
          componentName,
          ...component,
          ...imageSchemaTransformed,
        };
      });

      return {
        id: d.id,
        slug: d.slug,
        components: components,
      };
    });

    return {
      ...transformed[0],
    };
  }

  _filterAndTransformImageSchema(component: any) {
    //Loop through component fields and check if any have the term 'image'.
    const filteredFields = Object.fromEntries(
      Object.entries(component).filter(([key, value]) => {
        console.log(key, typeof value);
        return key.toLowerCase().includes("image");
      }),
    );

    //Loop through our found objects and transform the schema.
    Object.keys(filteredFields).forEach((key) => {
      filteredFields[key] = this._migrateImageSchema(filteredFields[key]);
    });

    return filteredFields;
  }

  _migrateImageSchema(oldSchema: any) {
    if (!oldSchema) return {};
    const newSchema = {
      name: oldSchema.name,
      alt: oldSchema.alternativeText,
      url: oldSchema.url,
    };

    return newSchema;
  }

  _getFormattedComponentName(component: string) {
    const capRegex = /(\b[a-z](?!\s))/g;
    const formatRegex = /^.*\./g;

    //Remove everything before the dot., ie., global.cool-hero
    let formattedStr = component.replace(formatRegex, "");

    formattedStr = formattedStr.replace(capRegex, (str: string) => {
      return str.toUpperCase();
    });

    // Remove dash
    return (formattedStr = formattedStr.replace("-", ""));
  }

  getRegisteredSingleTypeRoutes(globalSettings: any) {
    const singleTypes = globalSettings.registeredSingleTypes.map(
      (item: any) => `/api/page-data/strapi/collection/${item.text}`,
    );

    return singleTypes;
  }
}
