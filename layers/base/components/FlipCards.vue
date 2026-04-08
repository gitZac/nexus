<template>
  <article class="flip-cards">
    <div class="container">
      <div class="flip-cards__section-content spacing spacing--is-mb-large">
        <h2
          class="heading heading--is-level-2 heading--is-semi-bold has-text-secondary spacing spacing--is-mb-xsmall"
        >
          {{ sectionContent.title }}
        </h2>
        <p class="copy copy--is-medium">{{ sectionContent.text }}</p>
      </div>
      <div class="flip-cards__cards grid">
        <div
          class="flip-cards__card grid-item grid-item--is-one-third-desktop has-text-pure"
          v-for="card in flipCard"
          :style="`background-image: url(${card.image.url})`"
          :class="getFlippedClasses"
        >
          <div class="flip-cards__card-front">
            <p
              class="copy copy--is-large copy--is-semi-bold flip-cards__card-title"
            >
              {{ card.content.title }}
            </p>

            <div class="flip-cards__animation-wrapper">
              <GlobalIcon
                class="flip-cards__icon"
                :iconColor="'pure'"
                :icon="'eye'"
                :iconSize="`medium`"
              />
              <p class="flip-cards__description copy copy--is-medium">
                {{ card.content.text }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
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
  cardColumns: {
    type: Number,
    default: 3,
  },
});

const isFlipped = ref(false);
const getFlippedClasses = computed(() => {
  return isFlipped.value ? `flip-cards__card--is-flipped` : "";
});
</script>

<style lang="scss">
@use "./../../../assets/scss/abstracts" as dx;
@use "./../../../assets/scss/abstracts/mixins" as dx-mx;
@use "./../../../assets/scss/abstracts/functions" as dx-fn;
@use "./../../capybara/assets/scss/variables.scss" as vars;
@use "sass:list";

.flip-cards {
  $selector: list.nth(&, 1);
  $d: list.nth($selector, list.length($selector));

  &__section-content {
    text-align: center;
  }

  &__card {
    position: relative;
    min-height: 275px;
    display: flex;
    align-items: center;
    flex-direction: column;

    &:after {
      position: absolute;
      opacity: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(black, 0.6);
      top: 0;
      left: 0;
      content: "";
      z-index: 0;
      transition: all ease-in-out 0.2s;
    }
  }

  &__card:hover {
    cursor: pointer;
    &::after {
      opacity: 1;
    }

    #{$d}__animation-wrapper {
      opacity: 1;
    }
  }

  &__card-title {
    padding-bottom: 3rem;
  }

  &__icon {
    padding-bottom: 3rem;
  }

  &__card-front {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__animation-wrapper {
    transition: all ease-in-out 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0;
  }
}
</style>
