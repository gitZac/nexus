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

const {
  data: eventData,
  status,
  error,
  refresh,
} = await useFetch("/api/eventbrite", {
  query: { collection: collection, slug: pageSlug },
});
</script>

<style scoped></style>
