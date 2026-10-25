import logger from "@/logger";
import { BarraBusca } from "@/components/BarraBusca";
import { CardPost } from "@/components/CardPost";
import { Paginacao } from "@/components/Paginacao/paginacao";

async function getAllPosts(page) {
  const response = await fetch(
    `http://localhost:3801/posts?_page=${page}&_per_page=6`,
  );
  if (!response.ok) {
    logger.error("ops, alguma coisa ocorreu mal");
    return { data: [], item: 0 };
  }
  logger.info("Posts obtidos com sucesso");
  return response.json();
}

export default async function Home({ searchParams }) {
  const currentPage = await searchParams;
  const { data: posts } = await getAllPosts(currentPage);

  // 1. Lemos a página atual da URL. Se não existir, o padrão é a página 1.
  const paginaAtual = Number(currentPage?.page) || 1;

  const dbData = await getAllPosts(paginaAtual);

  // 🔴 LOG DE DIAGNÓSTICO: Abra o terminal do VS Code e veja o que vai aparecer aqui!
  console.log("====================================");
  console.log("O QUE VEIO DO JSON-SERVER:", dbData);
  console.log("====================================");

  let listaDePostsValida = [];
  let totalPostsGeral = 12;

  if (dbData) {
    if (Array.isArray(dbData)) {
      listaDePostsValida = dbData;
    } else if (dbData.data && Array.isArray(dbData.data)) {
      listaDePostsValida = dbData.data;
      totalPostsGeral = dbData.items || totalPostsGeral;
    }
  }

  const itensPorPagina = 6;
  const totalPaginas = Math.ceil(totalPostsGeral / itensPorPagina);

  logger.info(
    `Exibindo página ${paginaAtual} no navegador com ${listaDePostsValida.length} posts.`,
  );

  return (
    <main style={{ padding: "20px", backgroundColor: "#070707" }}>
      <BarraBusca />
      {/* 3. A sua grade com os cards mantém o CSS perfeito que você já consertou */}
      <section>
        {listaDePostsValida.map((post) => (
          <CardPost key={post.id} post={post} />
        ))}
      </section>

      {/* 4. Passamos as informações necessárias para o componente de botões abaixo */}
      <Paginacao paginaAtual={paginaAtual} totalPaginas={totalPaginas} />
    </main>
  );
}
