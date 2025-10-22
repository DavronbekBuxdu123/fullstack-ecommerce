"use client";
import { UserButton } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function ProfileButton() {
  const router = useRouter();
  return (
    <div>
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Action
            onClick={() => router.push("/user-orders")}
            labelIcon={<ShoppingBag className="w-4 h-4" />}
            label="See Orders"
          />
        </UserButton.MenuItems>
      </UserButton>
    </div>
  );
}

export default ProfileButton;
