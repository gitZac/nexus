import type { NormalizedProduct } from '@/types';

interface VendureProduct {
    id: string;
    name: string;
    slug: string;
    description: string;
    variants: Array<{
        id: string;
        name: string;
        price: number;
        sku: string;
    }>;
    image: string;
}

const mockProduct: VendureProduct = {
    id: "123",
    name: "Capybara Plush Toy",
    slug: "capybara-plush-toy",
    description: "A cuddly capybara plush toy, perfect for animal lovers!",
    variants: [{
        id: "variant-1",
        name: "Standard Size",
        price: 2999,
        sku: "CAPY-001"
    }],
    image: "https://media.istockphoto.com/id/177228186/photo/young-capybara.jpg?s=612x612&w=0&k=20&c=MaLAlTZA3N5fa2Gp2FeCdZCwSbCLXkVVeKTks7IJIgM="
};

export default defineEventHandler(async (event) => {
    const normalizeProduct = (product: VendureProduct): NormalizedProduct => {
        return {
            name: product.name,
            price: product.variants[0].price / 100, // Using first variant's price
            description: product.description,
            image: product.image,
        };
    };

    return normalizeProduct(mockProduct);
});
  

