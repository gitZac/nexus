<template>
  <div>
    <!-- <div v-if="!components.length" class="">Pending...</div> -->
    <!-- <component
      v-once
      v-else
      v-for="(component, index) in components"
      :is="component.component"
      :key="index"
      :componentData="component.data">
    </component> -->

    renderer

    <pre>
        {{ componentData }}

    </pre>
  </div>
</template>

<script setup>
const props = defineProps({
  componentData: {
    type: Array,
    default: () => [],
  },
});

//   const components = computed(() => {
//     return props.componentData.map((component) => {
//       const componentName = getFormattedComponentName(component.__component);
//       const data = component;
//       return {
//         data: data,
//         component: defineAsyncComponent(() => {
//           return import(`../components/${componentName}.vue`);
//         }),
//       };
//     });
//   });
</script>
