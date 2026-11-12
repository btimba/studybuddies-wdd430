import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { User } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "email and password are required" },
        { status: 400 }
      );
    }

    const result = await sql<User[]>`
      SELECT id, name, email, avatar_url, created_at
      FROM users
      WHERE email = ${email} AND password = ${password}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Failed to log in" },
      { status: 500 }
    );
  }
}
