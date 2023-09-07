import { Helius } from "helius-sdk";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { publicKey } = body;
  const helius = new Helius(process.env.HELIUS_API);

  const webhook = await helius.getWebhookByID(process.env.WEBHOOK_ID);
  const addresses = webhook?.accountAddresses;
  if (!addresses.includes(publicKey)) {
    try {
      await helius.appendAddressesToWebhook(process.env.WEBHOOK_ID, [
        publicKey,
      ]);
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: e }, { status: 500 });
    }
  }

  return NextResponse.json({ message: "ok" }, { status: 200 });
}
