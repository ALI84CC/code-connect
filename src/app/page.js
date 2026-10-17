"use client";
import logger from "@/logger";

import { Carrossel } from "@/components/Carrossel";
import { BarraBusca } from "@/components/BarraBusca";

async function fetchPosts() {
  try {
    logger.info("Iniciando a busca de posts...");

    const response = await fetch("http://localhost:3001/posts", {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const data = await response.json();
    logger.info(`Posts carregados com sucesso via API. Total: ${data.length}`);
    return data;
  } catch (error) {
    logger.error(`Falha ao conectar com o json-server: ${error.message}`);
    return [];
  }
}
export default async function HomePage() {
  // Acessamos postsData.posts que é onde a lista real está guardada
  const listaDePosts = await fetchPosts();

  return (
    <main style={{ padding: "20px", backgroundColor: "#070707" }}>
      <BarraBusca />
      <Carrossel posts={listaDePosts} />
    </main>
  );
}
