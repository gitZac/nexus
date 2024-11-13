import type { NormalizedProduct } from '@/types';

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  vendor: string;
  productType: string;
  tags: string[];
  status: 'active' | 'archived' | 'draft';
  featuredImage: {
    id: string;
    url: string;
    altText: string;
  } | null;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  variants: ShopifyVariant[];
}

interface ShopifyVariant {
  id: string;
  title: string;
  sku: string;
  price: Money;
  compareAtPrice: Money | null;
  inventoryQuantity: number;
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

interface Money {
  amount: string;
  currencyCode: string;
}

const mockProduct: ShopifyProduct = {
  id: "gid://shopify/Product/123",
  title: "Butterfly Plush Toy",
  handle: "butterfly-plush-toy",
  description: "A cuddly Butterfly plush toy, perfect for animal lovers!",
  descriptionHtml: "<p>A cuddly Butterfly plush toy, perfect for animal lovers!</p>",
  publishedAt: "2024-03-20T00:00:00Z",
  createdAt: "2024-03-20T00:00:00Z",
  updatedAt: "2024-03-20T00:00:00Z",
  vendor: "Butterfly Toys",
  productType: "Plush Toys",
  tags: ["plush", "toys", "capybara", "animals"],
  status: "active",
  featuredImage: {
    id: "gid://shopify/ProductImage/456",
    url: "https://example.com/capybara.jpg",
    altText: "Capybara Plush Toy"
  },
  priceRange: {
    minVariantPrice: { amount: "29.99", currencyCode: "USD" },
    maxVariantPrice: { amount: "29.99", currencyCode: "USD" }
  },
  variants: [{
    id: "gid://shopify/ProductVariant/789",
    title: "Default Title",
    sku: "CAPY-001",
    price: { amount: "29.99", currencyCode: "USD" },
    compareAtPrice: { amount: "39.99", currencyCode: "USD" },
    inventoryQuantity: 100,
    selectedOptions: [{
      name: "Title",
      value: "Default Title"
    }]
  }]
};

export default defineEventHandler(async (event) => {
  const normalizeProduct = (product: ShopifyProduct): NormalizedProduct => {
    return {
      name: product.title,
      price: parseFloat(product.priceRange.minVariantPrice.amount),
      description: product.description,
    };
  };

  return normalizeProduct(mockProduct);
});
  

