import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { User, NewUser } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body: NewUser = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "name, email, and password are required" },
        { status: 400 }
      );
    }

    const existing = await sql<User[]>`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "An account with that email already exists" },
        { status: 409 }
      );
    }

    const result = await sql<User[]>`
      INSERT INTO users (name, email, password, avatar_url)
      VALUES (${name}, ${email}, ${password}, ${null})
      RETURNING id, name, email, avatar_url, created_at
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}
