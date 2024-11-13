<template>
    <div class="product-page">
      <div class="image-placeholder">
        <img src="https://via.placeholder.com/300" alt="Product Image" />
      </div>
      <div class="product-details">
        <h1 class="product-name">{{ product.name }}</h1>
        <p class="product-price">${{ product.price }}</p>
        <p class="product-description">{{ product.description }}</p>
      </div>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ProductPage",
  setup() {
    const product = ref({
      name: "Sample Product",
      price: 99.99,
      description: "This is a sample product description.",
    });

    return {
      product,
    };
  },
};
</script>
  
<style scoped>
@import '../assets/css/Product.css';
</style>
  