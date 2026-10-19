import logger from "@/logger";
import { Paginacao } from "@/components/Paginacao/paginacao";
import { CardPost } from "@/components/CardPost";
import { BarraBusca } from "@/components/BarraBusca";

import listaDePosts from "@/data/posts.json";
import Styles from "./globals.css";

async function fetchPosts(page) {
  try {
    logger.info("Iniciando a busca de posts...");

    const response = await fetch(
      `http://localhost:3001/posts?_page=${page}&_per_page=6`,
      {
        cache: "no-store",
      },
    );
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

export default async function HomePage({ searchParams }) {
  // Acessamos postsData.posts que é onde a lista real está guardada
  const params = await searchParams;
  const paginaAtual = Number(params.get_page) || 1;
  const itensPorPagina = Number(params._per_page) || 6;

  const IndiceInicial = (paginaAtual - 1) * itensPorPagina;
  const IndiceFinal = IndiceInicial + itensPorPagina;

  const postsParaFatiar = listaDePosts.posts || listaDePosts;
  const postsPaginados = postsParaFatiar.slice(IndiceInicial, IndiceFinal);

  const totalPaginas = Math.ceil(postsParaFatiar.length / itensPorPagina);

  logger.info(
    `Exibindo página ${paginaAtual} com ${postsPaginados.length} posts.`,
  );

  return (
    <main style={{ padding: "20px", backgroundColor: "#070707" }}>
      <BarraBusca />
      {/* 3. A sua grade com os cards mantém o CSS perfeito que você já consertou */}
      <section className={Styles.grupoDeCards}>
        {postsPaginados.map((post) => (
          <CardPost key={post.id} post={post} />
        ))}
      </section>

      {/* 4. Passamos as informações necessárias para o componente de botões abaixo */}
      <Paginacao paginaAtual={paginaAtual} totalPaginas={totalPaginas} />
    </main>
  );
}
