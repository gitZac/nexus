import type { NormalizedProduct } from '@/types';

  
  const mockProduct: NormalizedProduct = {
    name: "Base Plush Toy",
    price: 29.99,
    description: "A cuddly capybara plush toy, perfect for animal lovers!",
  };
    
  export default defineEventHandler(async (event) => {
    return mockProduct;
  });
  

