import Link from "next/link";

import styles from "./paginacao.module.css";

export function Paginacao({ paginaAtual, totalPaginas }) {
  return (
    <div className={styles.botoesWrapper}>
      {paginaAtual > 1 ? (
        <Link
          href={`?_page=${paginaAtual - 1}&_per_page=6`}
          disabled={paginaAtual === 1}
          className={styles.botaoPaginacao}
        >
          ◀ Anterior
        </Link>
      ) : (
        <span className={styles.botaoPaginacaoDisabled}>◀ Anterior</span>
      )}
      <span style={{ color: "#fff", alignSelf: "center" }}>
        {paginaAtual} de {totalPaginas}
      </span>
      {/* Botão Próximo */}
      {paginaAtual < totalPaginas ? (
        <Link
          href={`?_page=${paginaAtual + 1}&_per_page=6`}
          className={styles.botaoPaginacao}
        >
          Próximo ▶
        </Link>
      ) : (
        <button className={styles.botaoPaginacao} disabled>
          Próximo ▶
        </button>
      )}
    </div>
  );
}
