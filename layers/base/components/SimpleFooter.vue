<template>
  <section class="simple-footer" :class="getBackgroundColor">
    <div class="container">
      <div class="grid">
        <div class="grid-item grid-item--is-half simple-footer__link-wrap">
          <nav class="simple-footer__link-nav">
            <ul class="simple-footer__links">
              <li
                v-for="link in menuData.footerLinks"
                class="simple-footer__link-item spacing spacing--is-mb-xsmall"
              >
                <a
                  class="simple-footer__link link link--is-medium link--is-semi-bold has-text-secondary-hover"
                  :href="link.url"
                  :class="getTextColor"
                  >{{ link.text }}</a
                >
              </li>
            </ul>
          </nav>
        </div>
        <div class="grid-item grid-item--is-half simple-footer__social-icons">
          <ul class="simple-footer__social-icon-list">
            <li
              v-for="icon in menuData.socialIcons"
              class="simple-footer__social-icon-item"
            >
              <a
                :href="icon.link"
                class="simple-footer__social-icon-link"
                :class="getTextColor"
              >
                <GlobalIcon
                  :iconColor="'pure'"
                  :icon="icon.icon"
                  :iconSize="`medium`"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="simple-footer__copyright">
        <p class="simple-footer__copyright-text copy" :class="getTextColor">
          {{ menuData.copyrightText }}
        </p>
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
  backgroundColor: {
    type: String,
    default: "greyscale-dark",
  },
  textColor: {
    type: String,
    default: "pure",
  },
});
const menuData = ref({});
const config = useRuntimeConfig();

try {
  const { data } = await useFetch(
    `/api/page-data/${config.public.pageData}/collection/${props.menuCollection}`,
  );

  menuData.value = data.value;
} catch (err) {
  console.log(err);
}

const getBackgroundColor = computed(() => {
  return `has-background-${props.backgroundColor}`;
});

const getTextColor = computed(() => {
  return `has-text-${props.textColor}`;
});
</script>

<style lang="scss" scoped>
@use "./../../../assets/scss/abstracts/initial-variables" as dx;
@use "./../../../assets/scss/abstracts/mixins" as dx-mx;
@use "./../../../assets/scss/abstracts/functions" as dx-fn;
@use "./../../capybara/assets/scss/variables.scss" as vars;
@use "sass:list";

.simple-footer {
  $selector: list.nth(&, 1);
  $d: list.nth($selector, list.length($selector));
  padding: 10rem 1rem;

  &__social-icon-list {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  &__social-icon-item {
    padding: 0 1rem;
  }

  &__link {
    text-transform: uppercase;
    text-decoration: none;
  }

  &__copyright-text {
    text-align: center;
  }
}
</style>
