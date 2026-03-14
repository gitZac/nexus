import { strapiFetch } from "./utils/strapiFetch";
import { strapiSchemaMigrator } from "./utils/StrapiSchemaMigrator";

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

  getRegisteredSingleTypeRoutes(globalSettings: any) {
    const singleTypes = globalSettings.registeredSingleTypes.map(
      (item: any) => `/api/page-data/strapi/collection/${item.text}`,
    );

    return singleTypes;
  }

  _transformComponentData(payload: any) {
    const transformed = payload.map((d: any) => {
      const components = d.components.map((component: any) => {
        const componentName = this._getFormattedComponentName(
          component.__component,
        );

        const componentImageSchemaTransformed = this._filterAndTransformSchema(
          component,
          "image",
        );

        return {
          componentName,
          ...componentImageSchemaTransformed,
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

  _filterAndTransformSchema(
    component: any,
    schemaKey: keyof typeof strapiSchemaMigrator,
  ) {
    const updatedFields: Record<string, any> = {};

    for (const [key, value] of Object.entries(component)) {
      if (Array.isArray(value)) {
        const transformed = this._deepTransformObjectArray(value, schemaKey);
        if (transformed) updatedFields[key] = transformed;
      } else if (key.toLowerCase().includes(schemaKey)) {
        updatedFields[key] = strapiSchemaMigrator[schemaKey](value);
      }
    }

    return { ...component, ...updatedFields };
  }

  _deepTransformObjectArray(
    arr: any[],
    searchKey: keyof typeof strapiSchemaMigrator,
  ) {
    const result: any[] = [];

    for (const item of arr) {
      //If the object does not have the searchKey, skip the array.
      if (!Object.prototype.hasOwnProperty.call(item, searchKey)) continue;

      const updatedItem = { ...item };
      for (const key of Object.keys(updatedItem)) {
        if (key.includes("image")) {
          updatedItem[key] = strapiSchemaMigrator[searchKey](updatedItem[key]);
        }
      }
      result.push(updatedItem);
    }

    return result.length ? result : null;
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
}
