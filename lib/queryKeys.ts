export const queryKeys = {
    products: {
        all: ['products'] as const,
        byId: (id: string) => ['products', id] as const,
        byCategory: (categorySlug: string) => ['products', 'category', categorySlug] as const,
        bySubcategory: (subcategorySlug: string) => ['products', 'subcategory', subcategorySlug] as const,
        featured: ['products', 'featured'] as const,
    },

    categories: {
        all: ['categories'] as const,
    },

    subcategories: {
        byCategory: (categoryId: string) => ['subcategories', categoryId] as const,
    },

    cart: {
        byUser: (userId: string) => ['cart', userId] as const,
    },

    profile: {
        byUser: (userId: string) => ['profile', userId] as const,
    },

    orders: {
        byUser: (userId: string) => ['orders', userId] as const,
    },

    reviews: {
        byProduct: (productId: string) => ['reviews', productId] as const,
    },
    
    brands: {
        all: ['brands'] as const,
    },
}