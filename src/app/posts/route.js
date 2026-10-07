import { NextResponse } from "next/server";
import posts from "@/data/posts.json";

export async function GET() {
  try {
    // process.cwd() garante que o Node busque a partir da raiz onde está o posts.json
    const res = await fetch("http://localhost:3000/posts.json");
    const post = await res.json();

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { erro: "Falha ao ler o arquivo posts.json" },
      { status: 500 },
    );
  }
}
