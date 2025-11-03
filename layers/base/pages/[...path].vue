<template>
  <main class="entry" :class="pageSlug == '/' ? 'home' : pageSlug">
    <div>
      it's working somehow
      {{ pageData }}
      <DynamicRenderer :componentData="pageData?.components" />
    </div>
    <!-- <div v-else class="">We're sorry, we couldn't load your data.</div> -->
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

    console.log(`/api/page-data/${config.public.pageData}`);

    pageData.value = data.value;

    console.log(pageData.value);
    console.log(data.value);
  } catch (err) {
    console.log(err);
  }
});
</script>
