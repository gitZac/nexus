import type { NormalizedProduct } from '@/types';

  
  const mockProduct: NormalizedProduct = {
    name: "Base Plush Toy",
    price: 29.99,
    description: "A cuddly capybara plush toy, perfect for animal lovers!",
    image: "https://media.istockphoto.com/id/177228186/photo/young-capybara.jpg?s=612x612&w=0&k=20&c=MaLAlTZA3N5fa2Gp2FeCdZCwSbCLXkVVeKTks7IJIgM=",
  };
    
  export default defineEventHandler(async (event) => {
    return mockProduct;
  });
  

