export default class StrapiApiController {
  params = {
    collection: "",
    slug: "",
  };
  config = {};

  constructor(params: any, config: any) {
    this.params = params;
    this.config = config;
  }

  _getFormattedComponentName(component: string) {
    const capRegex = /(\b[a-z](?!\s))/g;
    const formatRegex = /^.*\./g;

    //Remove global
    let formattedStr = component.replace(formatRegex, "");

    //Capitalize before and after dash
    formattedStr = formattedStr.replace(capRegex, (str: string) => {
      return str.toUpperCase();
    });

    // Remove dash
    formattedStr = formattedStr.replace("-", "");

    return formattedStr.toLowerCase();
  }

  async queryCollectionData() {
    const url = `${this.config.apiBase}/${this.params.collection}?filters[slug]=${this.params.slug}&populate=*`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const { data } = await response.json();

      const transformed = data.map((d: any) => {
        const components = d.components.map((component) => {
          const componentName = this._getFormattedComponentName(
            component.__component
          );

          return {
            componentName,
            ...component,
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
    } catch (err) {
      console.log(err);
    }
  }
}
