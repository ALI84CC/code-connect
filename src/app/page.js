import { BarraBusca } from "@/components/BarraBusca";
import { getAllPosts } from "@/lib/route";
import { CardPost } from "@/components/CardPost"; // Reaproveitando o componente que ajustamos
import styles from "./page.module.css"; // Importando seu CSS Module

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <main className={styles.main}>
      <BarraBusca />

      {/* Aplicando a sua classe do Grid Responsivo de 2 colunas */}
      <section className={styles.grupoDeCards}>
        {posts.map((post) => (
          /* Renderiza o CardPost passando highlighted={false} para os cards normais da Home */
          <CardPost key={post.id} post={post} highlighted={false} />
        ))}
      </section>
    </main>
  );
}
