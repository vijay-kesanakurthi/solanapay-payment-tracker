import { useEffect, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

import {
  // enums
  Helius,
  Webhook,
} from "helius-sdk";
import QR from "./qr";
import { useWallet } from "@solana/wallet-adapter-react";
import { EnrichedTransaction } from "helius-sdk";
import TransactionCard from "./transactioncard";

export default function Main() {
  const [transactions, setTransactions] = useState<EnrichedTransaction[]>([]);
  const { speak } = useSpeechSynthesis();
  const [fetchData, setFetchData] = useState<Boolean>(false);
  const { publicKey } = useWallet();

  useEffect(() => {
    const fetchWebhook = async () => {
      try {
        const data = await fetch("api/webhooks");
        console.log("data", data);
        const web: EnrichedTransaction[] = await data.json();
        console.log("webhook", web);

        const webdata = web.filter(
          (e: any) => e?.accountData[1].account === publicKey?.toBase58()
        );
        console.log("webdata", webdata);
        if (webdata.length > 0) {
          setTransactions([...transactions, ...webdata]);
          webdata.forEach((e: any) => {
            speak({ text: `Recieved ${e?.description.split(" ")[2]} SOL` });
          });
        }
        console.log("transactions", transactions);
      } catch (e) {
        console.log(e);
      }
    };

    if (fetchData) {
      fetchWebhook();

      const interval = setInterval(() => {
        fetchWebhook();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [fetchData, publicKey, speak, transactions]);

  useEffect(() => {
    const addAddressIfNotExists = async () => {
      try {
        const pubkey = publicKey?.toBase58();
        const res = await fetch("api/helius", {
          method: "POST",
          headers: {
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ publicKey: pubkey }),
        });

        res.ok
          ? setFetchData(true)
          : console.log("Error in adding address to webhook");
      } catch (e) {
        console.log(e);
      }
    };
    addAddressIfNotExists();
  }, [publicKey]);

  return (
    <div className="flex flex-row justify-evenly">
      <QR />
      <div className="text-2xl  flex-2">
        {transactions.length === 0 ? (
          <h1 className="text-3xl m-12">No transactions</h1>
        ) : (
          <div className="">
            <h1 className="text-3xl m-12 text-center "> Transactions</h1>
            <div className="grid grid-cols-2 gap-3">
              {transactions.map((e, i) => (
                <TransactionCard transaction={e} key={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
