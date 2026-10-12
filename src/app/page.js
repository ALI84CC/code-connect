"use client";

import postsData from "@/data/posts.json";

import { Carrossel } from "@/components/Carrossel";
import { BarSearch } from "@/components/BarraBusca";

export default function HomePage() {
  // Acessamos postsData.posts que é onde a lista real está guardada
  const listaDePosts = postsData.posts;

  return (
    <main style={{ padding: "20px", backgroundColor: "#070707" }}>
      <BarSearch />
      <Carrossel />
    </main>
  );
}
