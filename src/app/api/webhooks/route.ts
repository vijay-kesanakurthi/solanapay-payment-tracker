import { TokenTransfer } from "helius-sdk";
import { NextResponse } from "next/server";
let data: any = [];

export async function POST(request: Request) {
  const req = await request.json();
  data.push(...req);

  console.log(data);
  // console.log("works", data[0].accountData);

  return new Response();
}

export async function GET(request: Request) {
  const res = data;
  data = [];
  return NextResponse.json(res);
}
