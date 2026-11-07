import { BarraBusca } from "@/components/BarraBusca";
import { getAllPosts } from "@/lib/route";
import { CardPost } from "@/components/CardPost"; // Reaproveitando o componente que ajustamos
import styles from "./page.module.css"; // Importando seu CSS Module
import { Paginacao } from "@/components/Paginacao/paginacao";

// No Next.js App Router, as propriedades searchParams são passadas automaticamente para a página
export default async function HomePage({ searchParams }) {
  const params = await searchParams;

  // 1. CORREÇÃO: Garante a decodificação correta de caracteres especiais (como ç e ã)
  // e remove espaços vazios nas pontas.
  const termoBruto = params?.q ? String(params.q) : "";
  const termoBusca = decodeURIComponent(termoBruto).trim().toLowerCase();

  // 2. CORREÇÃO: Busca os posts garantindo acesso ao Array correto (.posts)
  const dadosPosts = getAllPosts();
  const allPosts = Array.isArray(dadosPosts)
    ? dadosPosts
    : dadosPosts?.posts || [];

  // 3. Filtragem extremamente segura e resiliente
  const postsFiltrados = allPosts.filter((post) => {
    const titulo = post?.title ? String(post.title).trim().toLowerCase() : "";
    const descricao = post?.body ? String(post.body).trim().toLowerCase() : "";

    return titulo.includes(termoBusca) || descricao.includes(termoBusca);
  });

  // 4. Paginação baseada nos posts filtrados
  const paginaAtual = Number(params?._page) || 1;
  const cardsPerPage = 6;
  const totalPaginas = Math.ceil(postsFiltrados.length / cardsPerPage);

  const indexOfLastCard = paginaAtual * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentPosts = postsFiltrados.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <main className={styles.main}>
      <BarraBusca />

      {/* RENDERIZAÇÃO CONDICIONAL */}
      {postsFiltrados.length === 0 ? (
        /* Caso não encontre nenhum post */
        <div className={styles.semResultados}>
          <h2>Nenhum resultado encontrado 🔍</h2>
          <p>
            Não encontramos publicações com o termo digitado. Tente buscar por
            outra palavra-chave!
          </p>
        </div>
      ) : (
        /* Caso existam posts, exibe a estrutura normal */
        <>
          <section key={paginaAtual} className={styles.grupoDeCards}>
            {currentPosts.map((post) => (
              <CardPost key={post.id} post={post} highlighted={false} />
            ))}
          </section>

          {/* Só mostra a paginação se houver mais de uma página */}
          {totalPaginas > 1 && (
            <Paginacao paginaAtual={paginaAtual} totalPaginas={totalPaginas} />
          )}
        </>
      )}
    </main>
  );
}
