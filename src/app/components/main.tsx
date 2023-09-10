import { useEffect, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import QR from "./qr";
import { useWallet } from "@solana/wallet-adapter-react";
import { EnrichedTransaction } from "helius-sdk";
import TransactionCard from "./transactioncard";

const TRASACTION_LEN = 10;

export default function Main() {
  const [transactions, setTransactions] = useState<EnrichedTransaction[]>([]);
  const { speak } = useSpeechSynthesis();
  const [fetchData, setFetchData] = useState<Boolean>(false);
  const { publicKey } = useWallet();

  useEffect(() => {
    const fetchWebhook = async () => {
      try {
        const data = await fetch("api/webhooks");

        const web: EnrichedTransaction[] = await data.json();

        const webdata = web.filter(
          (e: any) => e?.accountData[1].account === publicKey?.toBase58()
        );
        if (webdata.length > 0) {
          setTransactions((e) => [
            ...webdata.reverse(),
            ...e.slice(0, TRASACTION_LEN - webdata.length),
          ]);
          webdata.forEach((e: any) => {
            speak({
              text: `Recieved ${e?.description.split(" ")[2]} ${
                e?.description.split(" ")[3]
              }`,
            });
          });
        }
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
        console.log("res", res);

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
    <div className="flex flex-col md:flex-row  sm:items-center justify-evenly mb-10  ">
      <QR />
      <div className="text-2xl  flex-2">
        {transactions.length === 0 ? (
          <h1 className="text-3xl font-semibold m-12">No transactions</h1>
        ) : (
          <div className="">
            <h1 className="text-3xl font-semibold m-12 text-center ">
              {" "}
              Transactions
            </h1>
            <div className="grid xl:grid-cols-2  gap-3 grid-cols-1">
              {transactions.map((e, i) => (
                <TransactionCard transaction={e} key={i} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
