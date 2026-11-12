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
        // Clicar no fundo escuro fecha o modal
        <div className={styles.overlay} onClick={aoFechar}>
          {/* stopPropagation impede que clicar dentro do formulário feche o modal */}
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button onClick={aoFechar} className={styles.botaoFechar}>
              X
            </button>

            {/* Coloque aqui o restante do código do seu formulário de publicação */}
            <h2>Novo Projeto</h2>
          </div>
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
