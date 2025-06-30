<template>
  <component
    v-for="(component, index) in componentData"
    :key="index"
    :is="component.componentName" />

  <pre>
      {{ componentData }}

    </pre
  >
</template>

<script setup>
const props = defineProps({
  componentData: {
    type: Array,
    default: () => [],
  },
});
</script>
