import logger from "@/logger";
import { Paginacao } from "@/components/Paginacao/paginacao";
import { CardPost } from "@/components/CardPost";
import { BarraBusca } from "@/components/BarraBusca";
import Link from "next/link";

import Styles from "./page.module.css";

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

  // 1. Lemos a página atual da URL. Se não existir, o padrão é a página 1.
  const paginaAtual = Number(params._page) || 1;

  // 2. Buscamos os posts REAIS vindos do json-server usando a função que você já criou
  const dbData = await fetchPosts(paginaAtual);

  // Tratamento de segurança: caso a API falhe, evitamos que o código quebre
  const listaDePostsValida = Array.isArray(dbData) ? dbData : dbData.data || [];

  // 3. Como o json-server já devolve os posts cortados e paginados da API,
  // não precisamos fazer .slice() na mão! Usamos os dados diretamente.

  // 4. Cálculo do total de páginas.
  // Nota: Se o seu json-server não devolve o total no cabeçalho, podemos estipular
  // temporariamente com base em um valor fixo de posts, ou usar a extensão total dos dados locais.
  const totalPostsGeral = 12; // Ajuste para o total de itens que você tem cadastrado no seu db.json
  const itensPorPagina = 6;
  const totalPaginas = Math.ceil(totalPostsGeral / itensPorPagina);

  logger.info(`Exibindo página ${paginaAtual} no navegador.`);

  return (
    <main style={{ padding: "20px", backgroundColor: "#070707" }}>
      <BarraBusca />
      {/* 3. A sua grade com os cards mantém o CSS perfeito que você já consertou */}
      <section className={Styles.grupoDeCards}>
        {listaDePostsValida.map((post) => (
          <Link
            href={`/${post.slug}`}
            key={post.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <CardPost key={post.id} post={post} />
          </Link>
        ))}
      </section>

      {/* 4. Passamos as informações necessárias para o componente de botões abaixo */}
      <Paginacao paginaAtual={paginaAtual} totalPaginas={totalPaginas} />
    </main>
  );
}
