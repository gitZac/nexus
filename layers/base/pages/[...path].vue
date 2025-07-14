<template>
  <main class="entry" :class="pageSlug == '/' ? 'home' : pageSlug">
    <div v-if="pageData">
      <DynamicRenderer :componentData="pageData?.components" />
    </div>
    <div v-else class="">We're sorry, we couldn't load your data.</div>
  </main>
</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const pageSlug = generatePageSlugFromRoute(route.path);
const pageData = ref(null);

onMounted(async () => {
  try {
    await nextTick();

    const { data } = await useFetch(
      `/api/page-data/${config.public.pageData}`,
      {
        query: { collection: "pages", slug: pageSlug },
      }
    );

    pageData.value = data.value;
  } catch (err) {
    console.log(err);
  }
});
</script>
