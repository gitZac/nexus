<template>
  <section class="magazine-hero">
    from magazine hero
    <button class="button button--is-primary">Learn More</button>
  </section>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  subTitle: {
    type: String,
    default: "",
  },
  superTitle: {
    type: String,
    default: "",
  },
  coverImage: { type: Object, default: () => {} },
});
</script>

<style scoped></style>
