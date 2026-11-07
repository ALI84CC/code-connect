import Link from "next/link";
import styles from "./paginacao.module.css";

export function Paginacao({ paginaAtual, totalPaginas }) {
  return (
    <div className={styles.botoesWrapper}>
      {/* BOTÃO ANTERIOR CONDICIONAL */}
      {paginaAtual > 1 ? (
        <Link
          href={`?_page=${paginaAtual - 1}&_per_page=6`}
          className={styles.botaoPaginacao}
        >
          ◀ Anterior
        </Link>
      ) : (
        <span className={styles.botaoPaginacaoDisabled}>◀ Anterior</span>
      )}

      {/* INDICADOR DE PÁGINA */}
      <span style={{ color: "#fff", alignSelf: "center" }}>
        {paginaAtual} de {totalPaginas}
      </span>

      {/* BOTÃO PRÓXIMO CONDICIONAL */}
      {paginaAtual < totalPaginas ? (
        <Link
          href={`?_page=${paginaAtual + 1}&_per_page=6`}
          className={styles.botaoPaginacao}
        >
          Próximo ▶
        </Link>
      ) : (
        <span className={styles.botaoPaginacaoDisabled}>Próximo ▶</span>
      )}
    </div>
  );
}
