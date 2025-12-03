<template>
  <section class="simple-nav">
    <div class="container">
      <div class="grid">
        <div
          class="simple-nav__logo grid-item grid-item--is-half grid-item--is-one-third-desktop"
        >
          <img
            :src="`${config.public.strapiUrlBase}${menuData?.logo?.url}`"
            alt=""
          />
        </div>

        <div class="simple-nav__mobile-controls grid-item grid-item--is-half">
          <svg
            class="simple-nav__close"
            @click="toggleNav"
            v-if="navIsOpen"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
            />
          </svg>

          <svg
            class="simple-nav__open"
            @click="toggleNav"
            v-else
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z"
            />
            <path
              d="M2 12.0322C2 11.4799 2.44772 11.0322 3 11.0322H21C21.5523 11.0322 22 11.4799 22 12.0322C22 12.5845 21.5523 13.0322 21 13.0322H3C2.44772 13.0322 2 12.5845 2 12.0322Z"
            />
            <path
              d="M3 17.0645C2.44772 17.0645 2 17.5122 2 18.0645C2 18.6167 2.44772 19.0645 3 19.0645H21C21.5523 19.0645 22 18.6167 22 18.0645C22 17.5122 21.5523 17.0645 21 17.0645H3Z"
            />
          </svg>
        </div>

        <nav
          class="simple-nav__nav simple-nav__nav--is-desktop grid-item grid-item--is-two-thirds-desktop"
        >
          <ul class="simple-nav__menu">
            <li
              class="simple-nav__menu-item spacing"
              v-for="link in menuData.links"
            >
              <a
                class="simple-nav__link link link--is-font-secondary link--is-medium link--is-bold has-text-text has-text-primary-hover"
                :href="link.url"
                >{{ link.text }}</a
              >
            </li>
            <a
              :href="menuData?.ctaButton?.ctaLink"
              class="button button--is-secondary"
              >{{ menuData?.ctaButton?.ctaText }}</a
            >
          </ul>
        </nav>

        <nav class="simple-nav__nav simple-nav__nav--is-mobile">
          <ul
            v-if="navIsOpen"
            class="simple-nav__menu has-background-greyscale-light"
          >
            <li
              class="simple-nav__menu-item spacing spacing--is-mb-small"
              v-for="link in menuData.links"
            >
              <a
                class="simple-nav__link link link--is-font-secondary link--is-medium link--is-bold has-text-text has-text-primary-hover"
                :href="link.url"
                >{{ link.text }}</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  menuCollection: {
    type: String,
    default: "main-nav",
  },
});

const menuData = ref({});
const config = useRuntimeConfig();
const navIsOpen = ref(false);

const toggleNav = () => {
  navIsOpen.value = !navIsOpen.value;
};

onMounted(async () => {
  try {
    const { data } = await useFetch(
      `/api/page-data/${config.public.pageData}/collection/${props.menuCollection}`
    );

    menuData.value = data.value;
  } catch (err) {
    console.log(err);
  }
});
</script>

<style lang="scss" scoped>
@use "./../../../assets/scss/abstracts/initial-variables" as dx;
@use "./../../../assets/scss/abstracts/mixins" as dx-mx;
@use "./../../../assets/scss/abstracts/functions" as dx-fn;
@use "./../../capybara/assets/scss/variables.scss" as vars;

.simple-nav {
  padding: 0 2rem;

  &__logo img {
    max-width: 100%;
  }

  &__mobile-controls {
    display: flex;
    justify-content: flex-end;

    @include dx-mx.from(dx.$desktop) {
      display: none;
    }
  }

  &__menu {
    padding: 0 1rem;
    list-style-type: none;

    @include dx-mx.from(dx.$desktop) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
  }

  &__link {
    font-weight: 500;
    text-decoration: none;
  }

  &__close,
  &__open {
    height: 2.4rem;
    width: 2.4rem;
    fill: vars.$primary;
    font-weight: bold !important;

    path {
      stroke-width: 4px;
    }
  }

  &__menu-item {
    @include dx-mx.from(dx.$desktop) {
      padding: 0 dx-fn.spacer(3);
    }
  }

  &__nav--is-mobile {
    position: absolute;
    top: 100%;
    width: 100%;
    @include dx-mx.from(dx.$desktop) {
      display: none;
    }
  }

  &__nav--is-desktop {
    display: none;

    @include dx-mx.from(dx.$desktop) {
      display: flex;
      align-items: center;
      width: 100%;
    }
  }
}
</style>
