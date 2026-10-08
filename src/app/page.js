"use client";

import postsData from "@/data/posts.json";

import styles from "./page.module.css";

import { Carrossel } from "@/components/Carrossel";

export default function HomePage() {
  // Acessamos postsData.posts que é onde a lista real está guardada
  const listaDePosts = postsData.posts;

  return (
    <main style={{ padding: "20px", backgroundColor: "#070707" }}>
      <Carrossel />
    </main>
  );
}
