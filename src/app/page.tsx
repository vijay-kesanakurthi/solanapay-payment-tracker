"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import Main from "./components/main";
import Image from "next/image";
import { WalletModalButton } from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";
export default function Home() {
  const { connected } = useWallet();
  useEffect(() => {}, []);
  if (connected) {
    return (
      <div className="flex flex-col">
        <Main />
      </div>
    );
  }
  return (
    <div className="flex flex-row justify-evenly items-center h-[80vh]">
      <Image
        src="connect.svg"
        width={700}
        height={700}
        alt="graphics"
        className="hidden sm:block animate-in fade-in-30 slide-in-from-right-1/3 transition-all delay-75 duration-500"
      />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl lg:text-3xl mb-12">Connect your wallet</h1>

        <WalletModalButton
          style={{
            backgroundColor: "lightseagreen",
            width: "12rem",
            height: "4rem",
            fontSize: "1.3rem",
          }}
        />
      </div>
    </div>
  );
}
