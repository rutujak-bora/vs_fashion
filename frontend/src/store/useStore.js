import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAdmin: false,
      cart: [],
      
      setUser: (user, token, isAdmin = false) => 
        set({ user, token, isAdmin }),
      
      logout: () => 
        set({ user: null, token: null, isAdmin: false, cart: [] }),
      
      setCart: (cart) => 
        set({ cart }),
      
      addToCart: (item) => 
        set((state) => {
          const existing = state.cart.find(
            (i) => i.product_id === item.product_id && i.size === item.size
          );
          
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.product_id === item.product_id && i.size === item.size
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          
          return { cart: [...state.cart, item] };
        }),
      
      removeFromCart: (productId, size) =>
        set((state) => ({
          cart: state.cart.filter(
            (i) => !(i.product_id === productId && i.size === size)
          ),
        })),
      
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'vs-fashion-store',
    }
  )
);

export default useStore;
