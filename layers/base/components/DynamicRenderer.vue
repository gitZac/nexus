<template>
  <component
    v-for="(component, index) in componentData"
    :key="index"
    :is="component.componentName"
    v-bind="{ ...component }" />

  <!-- <pre>
      {{ componentData }}
    </pre
  > -->
</template>

<script setup>
const props = defineProps({
  componentData: {
    type: Array,
    default: () => [],
  },
});
</script>
