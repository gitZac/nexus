<template>
  <section class="simple-nav">
    <div class="container">
      <div class="grid">
        asjldads aslkdjaskljdalks
        <pre>
        {{ menuData }}

        </pre>

        <GlobalIcon icon="github" />
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  menuCollection: {
    type: String,
    default: "main-footer",
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
@use "sass:list";

.simple-nav {
  $selector: list.nth(&, 1);
  $d: list.nth($selector, list.length($selector));
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
    text-align: center;
    padding: 1rem;
    @include dx-mx.from(dx.$desktop) {
      display: none;
    }

    #{$d}__menu {
      padding: 1rem;
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
