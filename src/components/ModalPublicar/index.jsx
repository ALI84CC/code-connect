"use client";

import Link from "next/link";
import styles from "./modalPublicar.module.css";

export default function ModalPublicar() {
  const lidarComEnvio = (e) => {
    e.preventDefault();
    alert(
      "Post simulado com sucesso! (Em um cenário real, aqui dispararíamos uma Server Action para salvar no posts.json)",
    );
    // Redireciona para fechar o modal
    window.location.search = "";
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Nova Publicação</h2>
          {/* Link para voltar/fechar retirando o parâmetro da URL */}
          <Link href="?" className={styles.botaoFechar}>
            &times;
          </Link>
        </div>

        <form onSubmit={lidarComEnvio} className={styles.formulario}>
          <input type="text" placeholder="Título da publicação" required />
          <textarea
            placeholder="Conteúdo do post..."
            rows={5}
            required
          ></textarea>
          <button type="submit" className={styles.botaoEnviar}>
            Salvar Post
          </button>
        </form>
      </div>
    </div>
  );
}
