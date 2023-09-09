"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import Main from "./components/main";
export default function Home() {
  const { connected } = useWallet();
  if (!connected) {
    return (
      <div>
        <h1 className="text-3xl m-12">Connect your wallet</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <Main />
    </div>
  );
}
