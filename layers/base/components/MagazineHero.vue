<template>
  <section class="magazine-hero">
    from magazine hero
    <!-- 
    <pre>
        {{ props }}

    </pre> -->
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
