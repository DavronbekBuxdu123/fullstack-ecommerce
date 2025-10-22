"use client";
import { useAuth } from "@clerk/nextjs";
import React from "react";

function Page() {
  const { signOut } = useAuth();
  return (
    <div>
      <h1>You do not have a access!</h1>
      <button onClick={() => signOut()}>Sign Out!</button>
    </div>
  );
}

export default Page;
