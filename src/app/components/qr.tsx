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
    const message = "Thanks for visiting, Jungle Cats store";
    const memo = "Have a great day, Visit again";

    const mintUrl = encodeURL({
      recipient: publicKey,
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
      <div className=" flex flex-col items-center">
        <h1 className="text-3xl m-12  font-semibold">Scan and pay</h1>
        <div className="" ref={qrRef}></div>
      </div>
    </div>
  );
}
