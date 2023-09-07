import { EnrichedTransaction } from "helius-sdk";
import { format } from "timeago.js";

export default function TransactionCard({
  transaction,
}: {
  transaction: EnrichedTransaction;
}) {
  return (
    <div className=" shadow-lg rounded-sm overflow-hidden bg-[rgb(234, 239, 230)] backdrop-blur-2xl border-teal-700 border w-full text-black md:w-96">
      <div className="p-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-green-600 ">
            + {transaction.description.split(" ")[2]}
          </h3>
          <span className=" text-sm">
            {format(transaction.timestamp * 1000)}
          </span>
        </div>
        <div className="mt-2">
          <p className=" text-sm flex justify-normal">
            Transaction:{"  "}
            <a
              href={`https://solscan.io/tx/${transaction.signature}?cluster=devnet`} // Replace with the actual SolScan URL
              target="_blank"
              rel="noopener noreferrer"
              className=" font-semibold hover:underline flex justify-center"
            >
              <span className="font-medium ">
                {"  "}
                {transaction.signature.slice(0, 10)} ...{" "}
                {transaction.signature.slice(-10)}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-link-45deg ms-1"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />{" "}
                <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />{" "}
              </svg>
            </a>
          </p>
          <p className=" text-sm">
            Sender:{" "}
            <span className="font-medium ">
              {transaction.feePayer.slice(0, 9)} ...{" "}
              {transaction.feePayer.slice(-9)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
