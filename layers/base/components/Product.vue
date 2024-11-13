<template>
    <div class="product-page">
      <div class="image-placeholder">
        <img :src="product.image" alt="Product Image" />
      </div>
      <div class="product-details">
        <h1 class="product-name">{{ product?.name }}</h1>
        <p class="product-price">${{ product?.price }}</p>
        <p class="product-description">{{ product?.description }}</p>
      </div>
    </div>
</template>

<script setup>
const { data: product } = await useFetch('/api/product')
</script>
  
<style scoped>
@import '../assets/css/Product.css';
</style>
  