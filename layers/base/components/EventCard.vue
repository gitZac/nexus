<template>
  <article class="event-card">
    EventCard

    <pre>
        {{ props }}
    </pre>
  </article>
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
