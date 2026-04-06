import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ShippingForm, CheckoutStore } from '@/types';


const defaultShipping: ShippingForm = {
  full_name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: 'Kenya',
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      shipping: defaultShipping,
      orderId: null,
      setShipping: (shipping) => set({ shipping }),
      setOrderId: (orderId) => set({ orderId }),
      reset: () => set({ shipping: defaultShipping, orderId: null }),
    }),
    { name: 'konashop-checkout' }
  )
)