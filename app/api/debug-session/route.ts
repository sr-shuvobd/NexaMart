import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    return NextResponse.json({ session });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
