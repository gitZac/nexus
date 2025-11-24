<template>
  <section class="simple-nav">
    <pre>
        {{ menuData }}
    </pre>
    Simpple Nav
    <button class="button button--is-secondary">Learn More</button>
  </section>
</template>

<script setup>
const props = defineProps({
  menuCollection: {
    type: String,
    default: "main-nav",
  },
});

const menuData = ref({});
const config = useRuntimeConfig();

onMounted(async () => {
  try {
    await nextTick();

    const { data } = await useFetch(
      `/api/page-data/${config.public.pageData}/collection/${props.menuCollection}`
    );

    menuData.value = data.value;
  } catch (err) {
    console.log(err);
  }
});
</script>

<style scoped></style>
