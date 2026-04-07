<template>
  <section class="simple-hero">
    <div class="container">
      <div class="simple-hero__flex-wrap grid">
        <div class="simple-hero__content grid-item grid-item--is-half-desktop">
          <h1
            class="simple-hero__main-title heading heading--is-level-1 has-text-secondary heading--is-bold spacing spacing--is-mb-small"
          >
            {{ mainTitle }}
          </h1>
          <p class="copy simple-hero__intro spacing spacing--is-mb-small">
            {{ copy }}
          </p>

          <div class="simple-hero__ctas">
            <a
              v-for="button in props.heroCta"
              :href="button.ctaLink"
              class="button simple-hero__cta"
              :class="getCtaRoles(button.ctaRoles)"
              >{{ button.ctaText }}</a
            >
          </div>
        </div>

        <div
          class="simple-hero__image-wrap grid-item grid-item--is-half-desktop"
        >
          <img
            :src="`${props?.heroImage?.url}`"
            alt=""
            class="simple-hero__image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  mainTitle: {
    type: String,
  },
  heroImage: {},
  copy: {
    type: String,
  },
  heroCta: {},
  isTwoCol: {
    type: Boolean,
    default: false,
  },
});

const getCtaRoles = computed(() => {
  return (roles) => {
    if (!roles.length) {
      return ["button--is-disabled"];
    }

    return roles.map((role) => `button--is-${role.item}`);
  };
});
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
