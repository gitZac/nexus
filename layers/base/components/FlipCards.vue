<template>
  <article class="flip-cards">
    <pre>{{ props }}</pre>
  </article>
</template>

<script setup lang="ts">
const getCtaRoles = (roles) => {
  const computedRoles = [];

  roles.forEach((role) => {
    computedRoles.push(`button--is-${role.item}`);
  });

  return computedRoles;
};

const props = defineProps({
  sectionContent: {
    type: Object,
    default: () => ({
      title: "",
      text: "",
    }),
  },
  flipCard: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss">
@use "./../../../assets/scss/abstracts" as dx;
@use "./../../../assets/scss/abstracts/mixins" as dx-mx;
@use "./../../../assets/scss/abstracts/functions" as dx-fn;
@use "./../../capybara/assets/scss/variables.scss" as vars;
.flip-cards {
}
</style>
