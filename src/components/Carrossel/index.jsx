import { useState } from "react";
import postsData from "@/data/posts.json";
import { CardPost } from "@/components/CardPost"; // Seu componente de Card atual
import styles from "./carrossel.module.css";

export function Carrossel() {
  const [grupoAtual, setGrupoAtual] = useState(0);
  const posts = postsData.posts || postsData;

  const agruparDeQuatro = (Array, tamanhoDoGrupo) => {
    const grupos = [];
    for (let i = 0; i < Array.length; i += tamanhoDoGrupo) {
      grupos.push(Array.slice(i, i + tamanhoDoGrupo));
    }
    return grupos;
  };

  const listaDeGrupos = agruparDeQuatro(posts, 4);
  const totalDeGrupos = listaDeGrupos.length;

  const irParaProximoGrupo = () => {
    setGrupoAtual((prev) => (prev + 1) % totalDeGrupos);
  };

  const irParaGrupoAnterior = () => {
    setGrupoAtual((prev) => (prev - 1 + totalDeGrupos) % totalDeGrupos);
  };
  return (
    <div className={styles.carrosselContainer}>
      <div className={styles.containerControles}>
        <button
          onClick={irParaGrupoAnterior}
          className={styles.botaoCarrossel}
          disabled={totalDeGrupos <= 1}
        >
          ◀ Anterior
        </button>
        <button
          onClick={irParaProximoGrupo}
          className={styles.botaoCarrossel}
          disabled={totalDeGrupos <= 1}
        >
          Próximo ▶
        </button>
      </div>
      <div className={styles.grupoDeCards}>
        {listaDeGrupos[grupoAtual]?.map((post) => (
          <CardPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
