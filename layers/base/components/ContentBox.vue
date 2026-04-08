<template>
  <article class="content-box">
    <div class="content-box__content-wrap">
      <img
        :src="`${box?.image?.url}`"
        :alt="`${box?.image.alt}`"
        class="content-box__icon spacing spacing--is-mb-small"
      />
      <h3
        class="heading heading--is-level-3 content-box__title spacing spacing--is-mb-xxsmall"
      >
        {{ box.title }}
      </h3>
      <p class="copy content-box__copy spacing spacing--is-mb-small">
        {{ box.description }}
      </p>
      <div class="content-box__cta-wrap">
        <a
          :href="box?.cta.ctaLink"
          class="button simple-hero__cta"
          :class="getCtaRoles(box.cta.ctaRoles)"
          >{{ box.cta.ctaText }}</a
        >
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
const utilities = useUtilityClassHelpers();

const getCtaRoles = computed(() => {
  return (roles: any) => {
    return utilities.parseCtaRoles(roles);
  };
});

const props = defineProps({
  box: {
    type: Object,
    default: () => ({
      title: "",
      description: "",
      cta: {},
      image: {},
    }),
  },
});
</script>

<style lang="scss">
@use "./../../../assets/scss/abstracts" as dx;
@use "./../../../assets/scss/abstracts/mixins" as dx-mx;
@use "./../../../assets/scss/abstracts/functions" as dx-fn;
@use "./../../capybara/assets/scss/variables.scss" as vars;
.content-box {
  text-align: center;

  &__content-wrap {
    border: 2px solid dx.$greyscale-darker;
    padding: 4rem 0;
    margin-bottom: dx-fn.spacer(4);

    @include dx-mx.from(dx.$desktop) {
      margin-bottom: 0;
    }
  }
}
</style>
