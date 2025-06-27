<template>
  <div>
    {{ data }}
  </div>
</template>

<script setup>
const { data, status, error, refresh } = await useFetch("/api/strapi", {
  query: { collection: "pages", slug: "test-page" },
});
</script>
