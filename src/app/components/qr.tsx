"use client";
import { createQR, encodeURL, TransactionRequestURLFields } from "@solana/pay";
import { useEffect, useRef, useMemo } from "react";
import { PublicKey, Keypair } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
export default function QR() {
  const qrRef = useRef<HTMLDivElement>(null);
  const { publicKey } = useWallet();
  useEffect(() => {
    const reference = Keypair.generate().publicKey;
    const label = "Jungle Cats store";
    const message = "Jungle Cats store - your order - #001234";
    const memo = "JC#4098";

    const mintUrl = encodeURL({
      recipient: publicKey,
      // amount,
      reference,
      label,
      message,
      memo,
    });
    const mintQr = createQR(mintUrl, 400, "transparent");

    // Set the generated QR code on the QR ref element
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      mintQr.append(qrRef.current);
      console.log("mintQrRef.current", qrRef.current);
    }
  }, [qrRef, publicKey]);

  return (
    <div>
      <div className="">
        <h1 className="text-3xl m-12">Scan and pay</h1>
        <div ref={qrRef}></div>
      </div>
    </div>
  );
}
