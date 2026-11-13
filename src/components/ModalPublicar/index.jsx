"use client";

import { useRouter, usePathname } from "next/navigation";
import styles from "./modalPublicar.module.css";

export default function ModalPublicar() {
  const router = useRouter();
  const pathname = usePathname();

  // Função centralizada para fechar removendo os parâmetros da URL (ex: ?modal=true)
  const fecharModal = () => {
    router.push(pathname, { scroll: false });
    // Nota: Se você abriu o modal usando <Link href="?modal=true">,
    // também pode usar router.back() aqui se preferir.
  };

  const lidarComEnvio = (e) => {
    e.preventDefault();
    alert(
      "Post simulado com sucesso! (Em um cenário real, aqui dispararíamos uma Server Action para salvar no posts.json)",
    );
    // Fecha o modal de forma suave pelo Next.js
    fecharModal();
  };

  return (
    /* Clicar no fundo escuro fecha o modal */
    <div className={styles.overlay} onClick={fecharModal}>
      {/* stopPropagation impede que clicar dentro do modal feche ele */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* type="button" é essencial para não disparar o submit do formulário */}
        <button
          type="button"
          onClick={fecharModal}
          aria-label="Fechar modal"
          className={styles.botaoFechar}
        >
          ✕
        </button>

        <h2>Novo Projeto</h2>

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
