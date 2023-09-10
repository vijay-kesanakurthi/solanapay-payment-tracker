"use client";
import React from "react";
import dynamic from "next/dynamic";

// eliminating Hydration error  with dynamic import
const WalletMultiButtonDynamic = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);
export default function Nav() {
  return (
    <div className="">
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-lg md:text-2xl tracking-tight">
            Jungle Cats Store
          </span>
        </div>

        <WalletMultiButtonDynamic />
      </nav>
    </div>
  );
}
