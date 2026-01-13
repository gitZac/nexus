export const strapiFetch = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok)
      throw new Error(
        `Something went wrong with strapi fetch: ${response.status}`
      );

    const { data } = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    console.error(
      "Something went wrong with strapi fetch. Is the strapi server running?"
    );
  }
};
