<template>
  <div>
    <DynamicRenderer />
    {{ getPageSlug }}
    <pre>
    <!-- {{ route.matched[0].components.default.__file }} -->
    {{ pageData }}


</pre>
  </div>
</template>

<script setup>
const route = useRoute();
const slug = route.path;
const splitSlug = slug.split("/");
const innerRouteData = route.matched[0].components.default.__file.split("/");

splitSlug.shift();

let pageSlug = "/";

if (splitSlug.length) {
  pageSlug = splitSlug[splitSlug.length - 1];
}

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
