<template>
  <section
    :class="darkThemeClasses"
    class="multi-content-boxes has-background-neutral-dark"
  >
    <div class="container">
      <div class="multi-content-boxes__wrapper"></div>
      <h2
        class="heading heading--is-level-2 heading--is-semi-bold has-text-secondary multi-content-boxes__main-heading"
      >
        {{ props.sectionTitle }}
      </h2>

      <div class="multi-content-boxes__boxes-wrap grid">
        <div
          class="grid-item grid-item--is-one-third-desktop"
          v-for="box in props.contentBox"
        >
          <ContentBox :box="box" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
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

const darkThemeClasses = computed(() => {
  return props.isDarkTheme ? "multi-content-boxes--is-dark-theme" : "";
});
</script>

<style lang="scss">
@use "./../../../assets/scss/abstracts" as dx;
@use "./../../../assets/scss/abstracts/mixins" as dx-mx;
@use "./../../../assets/scss/abstracts/functions" as dx-fn;
@use "./../../capybara/assets/scss/variables.scss" as vars;
@use "sass:list";

.multi-content-boxes {
  padding: dx-fn.spacer(4) 0;

  &__main-heading {
    text-align: center;
    margin-bottom: dx-fn.spacer(4);
  }
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

.multi-content-boxes.multi-content-boxes--is-dark-theme {
  .copy,
  .heading {
    color: dx.$pure;
  }
}
</style>
