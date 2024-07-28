import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  cookies().delete("funds-explorer-token");
  return Response.json("Logged out", { status: 200 });
}
