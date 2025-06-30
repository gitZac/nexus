<template>
  <main class="entry" :class="pageSlug == '/' ? 'home' : pageSlug">
    <DynamicRenderer :componentData="pageData.components" />
  </main>
</template>

<script setup>
const route = useRoute();

const pageSlug = generatePageSlugFromRoute(route.path);
const innerRouteData = route.matched[0].components.default.__file.split("/");
const collection = innerRouteData[innerRouteData.length - 2];

const {
  data: pageData,
  status,
  error,
  refresh,
} = await useFetch("/api/strapi", {
  query: { collection: collection, slug: pageSlug },
});
</script>
