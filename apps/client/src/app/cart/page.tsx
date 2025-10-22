"use client";

import ShippingForm from "@/components/ShippingForm";
import useCartStore from "@/store/CartStore";
import { CartItemsType, ShippingFormInputs } from "@/types";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const steps = [
  {
    id: 1,
    title: "Shopping Cart",
  },
  {
    id: 2,
    title: "Shipping Address",
  },
  {
    id: 3,
    title: "Payment Methods",
  },
];

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function CartPage() {
  const [shippingform, setShippingForm] = useState<ShippingFormInputs>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeStep = searchParams.get("step") || "1";
  const { cart, removeFromCart } = useCartStore();

  return (
    <div className="w-full mt-12 flex flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-medium text-center">Your Cart Items</h1>
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`cursor-pointer flex items-center gap-4 border-b-2 ${
              step.id.toString() === activeStep
                ? "border-gray-900"
                : "border-gray-300"
            }  pb-4 `}
          >
            <div
              className={`${
                step.id.toString() === activeStep
                  ? "bg-gray-800"
                  : "bg-gray-300"
              } text-white rounded-full w-8 h-8 flex items-center justify-center `}
            >
              {step.id}
            </div>
            <div>
              <p
                className={`${
                  step.id.toString() === activeStep
                    ? "text-gray-800"
                    : "text-gray-300"
                }`}
              >
                {step.title}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col  lg:flex-row gap-16">
        <div className="w-full lg:w-7/12 shadow-lg border-1 border-gray-100 flex flex-col gap-8 p-8 rounded-md">
          {activeStep === "1" ? (
            <div>
              <h2 className="font-medium mb-10">Cart Items</h2>
              <div className="flex flex-col gap-12">
                {cart.map((pro) => (
                  <div
                    key={pro.id + pro.selectedColor + pro.selectedSize}
                    className="flex items-center gap-8"
                  >
                    <div>
                      <Image
                        className="rounded-lg w-32 h-32"
                        src={pro.images?.[pro.selectedColor] || ""}
                        alt=""
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <h2 className="text-md font-medium mb-3">
                          {" "}
                          {pro.name}
                        </h2>
                        <p className="text-gray-500">
                          Quantity: {pro.quantity}
                        </p>
                        <p className="text-gray-500">
                          Size: {pro.selectedSize}
                        </p>
                        <p className="text-gray-500 mb-2">
                          Color: {pro.selectedColor}
                        </p>
                        <p className="text-lg font-medium">
                          {" "}
                          ${(pro.price * pro.quantity).toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          removeFromCart(pro);
                          toast.success("Maxsulot savatdan o'chirildi");
                        }}
                        className="bg-red-400 w-8 h-8 rounded-full flex items-center justify-center text-red-200 cursor-pointer hover:bg-red-500 "
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div></div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeStep === "2" ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : (
            ""
          )}
        </div>
        <div className="w-full lg:w-5/12 shadow-lg border-1 border-gray-100 flex flex-col gap-8 p-8 rounded-md">
          <h2 className="font-semibold">Cart Details</h2>
          <div className="w-full border-b border-gray-300 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <p className="text-gray-500 font-semibold">Subtotal</p>
              <p className="font-medium">
                $
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-500 font-semibold">Discount (10%)</p>
              <p className="font-medium text-red-500">-${10}</p>
            </div>
            <div className="flex items-center justify-between mb-4 ">
              <p className="text-gray-500 font-semibold">Shipping Fee</p>
              <p className="font-medium">${10}</p>
            </div>
          </div>
          <div className="flex items-center justify-between ">
            <p className="text-gray-900 font-semibold">Total</p>
            <p className="font-medium">
              $
              {cart
                .reduce((acc, item) => +acc + item.price * item.quantity, -10)
                .toFixed(2)}
            </p>
          </div>
          {activeStep === "1" && (
            <button
              disabled={!(cart.length > 0)}
              onClick={() => router.push("/cart?step=2", { scroll: false })}
              className="bg-gray-800 px-3 py-2 gap-x-2 hover:bg-gray-900 cursor-pointer flex items-center justify-center text-white rounded-lg "
            >
              <p>
                {cart.length == 0
                  ? "Buyurtma uchun maxsulot tanlang!"
                  : "Davom etish"}
              </p>
              {cart.length > 0 && <ArrowRight className="w-4 h-4 mt-1" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
