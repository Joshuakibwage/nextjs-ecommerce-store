export interface ProductParams {
  id: string;
  author_id: string;
  sizes: string[];
  colors: string[];
  styles: string[];
  brand: string;
  status: string;
  image_url_array: string[];
  videos_url_array: string[];
  name: string;
  category: {
    id: string;
    name: string;
  };
  price: number;
  description: string;
  discount: number;
  quantity: number;
  product_shipping_fee: number;
  offer_price: number;
  created_at: Date;
  updated_at: Date;
  location: string;
  product_comment: string;
}

export interface AddressParams {
  id: string; // UUID
  user_id: string; // UUID (FK to auth.users)
  title?: string | null;
  region?: string; // default: 'Nigeria'
  address?: string | null;
  state?: string | null;
  city?: string | null;
  phone?: string | null;
  country_code?: string | null;
  flag?: string | null;
  is_default?: boolean; // default: false
  created_at?: string; // ISO timestamp
}

export type OrderStatus =
  | "processing"
  | "completed"
  | "cancelled"
  | "shipped"
  | "delivered"
  | "returned"
  | "waiting"
  | "reviewed";

export interface OrderParams {
  id: string; // UUID
  user_id: string; // UUID
  user_email?: string | null;
  product_name: string;
  product_category?: string | null;
  amount_paid: number; // NUMERIC(10,2)
  quantity_bought: number;
  image_url: string;
  status: OrderStatus;
  size?: string | null;
  color?: string | null;
  region?: string | null;
  state?: string | null;
  city?: string | null;
  address: string;
  phone: string;
  reference_paystack: string;
  country_code?: string | null;
  created_at?: string; // ISO timestamp
  updated_at?: string; // ISO timestamp
}



export type Category = {
  id: string
  name: string
  slug: string
  emoji: string | null
  image_url: string | null
  bg_color: string | null
  text_color: string | null
  border_color: string | null
  hover_color: string | null
  active_color: string | null
  created_at: string
}


export type Subcategory = {
  id: string
  name: string
  slug: string
  category_id: string
  image_url: string | null
  bg_color: string | null
  text_color: string | null
  border_color: string | null
  hover_color: string | null
  active_color: string | null
  created_at: string
}

export type Brand = {
  id: string
  name: string
  slug: string
  logo_url: string | null
  created_at: string
}

export type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  offer_price: number | null
  image_url_array: string[]
  quantity: number
  category_id: string | null
  subcategory_id: string | null
  brand_id: string | null
  rating: number
  rating_count: number
  is_featured: boolean
  is_active: boolean
  created_at: string
  category?: Category
  subcategory?: Subcategory
  brand?: Brand
}

export type Review = {
  id: string
  product_id: string
  user_id: string
  rating: number
  comment: string | null
  created_at: string
}

export type CartItem = {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  product?: Product
}


export type CartStore = {
  items: CartItem[]
  loading: boolean
  fetchCart: (userId: string) => Promise<void>
  addItem: (userId: string, item: { product_id: string; quantity: number }) => Promise<void>
  removeItem: (userId: string, cartItemId: string) => Promise<void>
  updateQuantity: (userId: string, cartItemId: string, quantity: number) => Promise<void>
  clearCart: (userId: string) => Promise<void>
}

export type ProductCardProduct = {
  id: string
  name: string
  description?: string | null
  price: number
  offer_price: number | null
  quantity?: number | null
  rating?: number | null
  image_url_array?: string[] | null
}

export interface ShippingForm {
  full_name: string
  email: string
  phone: string
  address: string
  city: string
  country: string
}

export interface CheckoutStore {
  shipping: ShippingForm
  orderId: string | null
  setShipping: (shipping: ShippingForm) => void
  setOrderId: (id: string) => void
  reset: () => void
}

export interface WishlistProduct {
  id: string
  name: string
  price: number
  offer_price: number | null
  image_url_array: string[] | null
  description: string | null
  rating: number | null
  slug: string
}

export interface WishlistItem {
  id: string
  product_id: string
  created_at: string
  product: WishlistProduct
}

export interface WishlistStore {
  items: WishlistItem[]
  loading: boolean
  fetchWishlist: (userId: string) => Promise<void>
  addToWishlist: (userId: string, productId: string) => Promise<void>
  removeFromWishlist: (userId: string, productId: string) => Promise<void>
  isWishlisted: (productId: string) => boolean
}


export type OrderItem = {
  id: string
  product_name: string
  product_image: string | null
  price: number
  quantity: number
  subtotal: number
}

export type Order = {
  id: string
  status: string
  payment_method: string
  payment_status: string
  total: number
  subtotal: number
  shipping: number
  full_name: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  created_at: string
  order_items: OrderItem[]
}