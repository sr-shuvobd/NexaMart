import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET || process.env.BETTER_AUTH_SECRET || "fallback_secret";
    
    // Create standard JWT token valid for 1 day
    const token = jwt.sign(
      {
        id: session.user.id,
        email: session.user.email,
        role: (session.user as any).role || "user",
        storeName: (session.user as any).storeName,
      },
      secret,
      { expiresIn: "1d" }
    );

    return NextResponse.json({ success: true, token });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
