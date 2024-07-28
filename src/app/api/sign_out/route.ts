import { cookies } from "next/headers";

export async function GET() {
  cookies().delete("funds-explorer-token");
  return Response.json("Logged out", { status: 200 });
}
