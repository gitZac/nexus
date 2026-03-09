<template>
  <section class="multi-content-boxes">
    <pre>
    {{ props }}

    </pre>
  </section>
</template>

<script setup>
const config = useRuntimeConfig();

const props = defineProps({
  sectionTitle: {
    type: String,
    default: " ",
  },
  isDarkTheme: {
    type: Boolean,
    default: false,
  },
  contentBox: {
    type: Array,
    default: () => [],
  },
});

const getCtaRoles = (roles) => {
  const computedRoles = [];

  roles.forEach((role) => {
    computedRoles.push(`button--is-${role.item}`);
  });

  return computedRoles;
};
</script>

<style lang="scss" scoped>
@use "./../../../assets/scss/abstracts/initial-variables" as dx;
@use "./../../../assets/scss/abstracts/mixins" as dx-mx;
@use "./../../../assets/scss/abstracts/functions" as dx-fn;
@use "./../../capybara/assets/scss/variables.scss" as vars;
@use "sass:list";

.simple-hero {
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 100%;
  }

  &__image-wrap {
    margin: auto;
  }

  &__image {
    max-width: 400px;
    @include dx-mx.from(dx.$desktop) {
      max-width: 100%;
    }
  }

  &__ctas {
    @include dx-mx.from(dx.$desktop) {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      width: 100%;
    }
  }

  &__cta {
    margin-right: 2rem;
  }

  &__content {
    padding: 5rem 0;

    @include dx-mx.from(dx.$desktop) {
      padding: 0;
    }
  }
}
</style>
