"use client";
import useCartStore from "@/store/CartStore";
import { useOrderStore } from "@/store/OrderStore";
import {
  ProductsType,
  ProductType,
  ShippingFormInputs,
  shippingFormSchema,
} from "@/types";
import { useAuth, useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
export type PayloadType = {
  userId: string | null;
  email: string;
  amount: number;
  status: string;
  products: [
    {
      name: string;
      quantity: number;
      price: number;
    },
  ];
  shipping: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
};
function ShippingForm() {
  const { clearCart } = useCartStore();
  const [cart, setCart] = useState<ProductsType>([]);
  const increase = useOrderStore((s) => s.increase);
  const router = useRouter();
  useEffect(() => {
    try {
      const productData = localStorage.getItem("cart");
      const parsed = JSON.parse(productData!).state.cart;
      setCart(parsed);
    } catch (error) {
      setCart([]);
      console.log(error);
    }
  }, []);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingFormSchema),
  });
  const { user } = useUser();
  const { getToken } = useAuth();

  const handleShippingForm: SubmitHandler<ShippingFormInputs> = async (
    data
  ) => {
    if (cart.length === 0) {
      toast.warn("Buyurtma uchun maxsulot tanlang!");
      return;
    }
    try {
      const token = await getToken();
      if (!token) {
        toast.error("Buyurtma berish uchun ro'yxatdan o'ting");
        return;
      }
      const cartItems = cart;
      const payload: PayloadType = {
        email: data.email,
        amount: cartItems.reduce(
          (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
          0
        ),
        status: "success",
        products: cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        shipping: {
          name: data.name,
          phone: data.phone,
          address: data.address,
          city: data.city,
        },
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/orders`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      increase();
      toast.success("Xurmatli mijoz, buyurtmangiz qabul qilindi!");
      reset();
      clearCart();
      localStorage.removeItem("cart");
      setCart([]);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={handleSubmit(handleShippingForm)}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-xs text-medium text-gray-500">
          Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          {...register("name")}
          className="border-b border-gray-200 outline-none py-2 text-sm"
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-xs text-medium text-gray-500">
          Email
        </label>
        <input
          type="email"
          placeholder="johndoe@gmail.com"
          {...register("email")}
          className="border-b border-gray-200 outline-none py-2 text-sm"
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-xs text-medium text-gray-500">
          Phone
        </label>
        <input
          type="text"
          placeholder="+99820 000 00 00"
          {...register("phone")}
          className="border-b border-gray-200 outline-none py-2 text-sm"
        />
        {errors.phone && (
          <p className="text-xs text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="address" className="text-xs text-medium text-gray-500">
          Address
        </label>
        <input
          type="text"
          placeholder="123, Main City"
          {...register("address")}
          className="border-b border-gray-200 outline-none py-2 text-sm"
        />
        {errors.address && (
          <p className="text-xs text-red-500">{errors.address.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="text-xs text-medium text-gray-500">
          City
        </label>
        <input
          type="text"
          placeholder="New York"
          {...register("city")}
          className="border-b border-gray-200 outline-none py-2 text-sm"
        />
        {errors.city && (
          <p className="text-xs text-red-500">{errors.city.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-gray-800 px-3 py-2 gap-x-2 cursor-pointer hover:bg-gray-900 flex items-center justify-center text-white rounded-lg transition-all"
      >
        {isSubmitting ? "Yuborilmoqda..." : "Yuborish"}
        <ArrowRight className="w-4 h-4 mt-1 ml-2" />
      </button>
    </form>
  );
}

export default ShippingForm;
