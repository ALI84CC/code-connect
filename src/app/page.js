import { BarraBusca } from "@/components/BarraBusca";
import { getAllPosts } from "@/lib/route";
import { CardPost } from "@/components/CardPost"; // Reaproveitando o componente que ajustamos
import styles from "./page.module.css"; // Importando seu CSS Module
import { Paginacao } from "@/components/Paginacao/paginacao";

// No Next.js App Router, as propriedades searchParams são passadas automaticamente para a página
export default async function HomePage({ searchParams }) {
  const posts = getAllPosts();

  // Captura a página atual da URL (ex: ?_page=2). Se não existir, assume a página 1.
  const params = await searchParams;
  const paginaAtual = Number(params._page) || 1;

  const cardsPorPagina = 6;
  const totalPaginas = Math.ceil(posts.length / cardsPorPagina);

  // Lógica para limitar a quantidade de itens na tela (Fatiando o array)
  const indexOfLastCard = paginaAtual * cardsPorPagina;
  const indexOfFirstCard = indexOfLastCard - cardsPorPagina;
  const currentPosts = posts.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <main className={styles.main}>
      <BarraBusca />

      {/* O segredo está aqui: adicionamos a key={paginaAtual} */}
      <section key={paginaAtual} className={styles.grupoDeCards}>
        {currentPosts.map((post) => (
          <CardPost key={post.id} post={post} highlighted={false} />
        ))}
      </section>

      <Paginacao paginaAtual={paginaAtual} totalPaginas={totalPaginas} />
    </main>
  );
}
