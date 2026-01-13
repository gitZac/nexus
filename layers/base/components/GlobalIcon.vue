<template>
  <span
    class="icon"
    v-html="icons[icon]"
    :aria-hidden="ariaHidden"
    :class="iconClasses"
  >
  </span>
</template>
<script setup lang="ts">
import * as globalIcons from "~/assets/icons";

const props = defineProps({
  icon: {
    type: String,
  },
  iconColor: {
    type: String,
    default: "primary",
  },
  iconSize: {
    type: String,
    default: "small",
    validator(value) {
      const values = ["small", "medium", "large"];
      return values.includes(value);
    },
  },
  extraClass: {
    type: String,
    default: "",
  },
  ariaHidden: {
    type: Boolean,
    default: false,
  },
});

const icons = computed(() => {
  return {
    ...globalIcons,
  };
});

const iconClasses = computed(() => {
  const colorClass = props.iconColor ? "icon--is-" + props.iconColor : "";
  return `${colorClass} ${props.extraClass} icon--is-${props.iconSize}`;
});
</script>
