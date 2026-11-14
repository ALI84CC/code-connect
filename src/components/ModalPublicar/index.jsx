"use client";

import { useRouter, usePathname } from "next/navigation";
import styles from "./modalPublicar.module.css";

export default function ModalPublicar({ aoFechar }) {
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
    if (aoFechar) {
      aoFechar();
    }
  };

  return (
    <div className={styles.overlay} onClick={fecharModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Novo Perfil</h2>
          <button
            type="button"
            onClick={aoFechar}
            aria-label="Fechar modal"
            className={styles.botaoFechar}
          >
            X
          </button>
        </div>
        <form onSubmit={lidarComEnvio} className={styles.formulario}>
          <label
            htmlFor="publicacao"
            placeholder="nome da publicação"
            alt="titulo da publicação"
          >
            Título da publicação
          </label>
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
