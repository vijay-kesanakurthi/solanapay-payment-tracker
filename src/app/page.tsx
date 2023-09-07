"use client";
import { useEffect, useState } from "react";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import Main from "./components/main";
export default function Home() {
  const { publicKey, connected } = useWallet();

  return (
    <div className="flex flex-col">
      {connected ? (
        <Main />
      ) : (
        <div>
          <h1 className="text-3xl m-12">Connect your wallet</h1>
        </div>
      )}
    </div>
  );
}
