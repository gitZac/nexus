<template>
  <article class="event-card-list">
    EventCardList
    <pre>
        {{ props }}
    </pre>
    <pre v-if="!list">
        LOADING
    </pre>
    <pre v-else>
        {{ list }}
        {{ `/api/event-data/${config.public.eventData}/events` }}
    </pre>
  </article>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  customEvents: {
    type: Array,
    default: () => [],
  },
});
const config = useRuntimeConfig();
const list = ref([]);

onMounted(async () => {
  try {
    await nextTick();
    const { data } = await useFetch(
      `/api/event-data/${config.public.eventData}/events`
    );
    list.value = data.value;
  } catch (err) {
    console.log(err);
  }
});
</script>
