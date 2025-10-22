import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OrderStore {
  orderCount: number;
  setOrderCount: (count: number) => void;
  increase: () => void;
  clear: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orderCount: 0,
      setOrderCount: (count) => set({ orderCount: count }),
      increase: () => set((state) => ({ orderCount: state.orderCount + 1 })),
      clear: () => set({ orderCount: 0 }),
    }),
    {
      name: "order-storage",
    }
  )
);
