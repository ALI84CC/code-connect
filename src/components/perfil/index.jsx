"use client";
import styles from "@/components/perfil/perfil.module.css";
import { usePathname, useRouter } from "next/navigation";

export default function ModalPerfil({ aoFechar }) {
  const router = useRouter();
  const pathname = usePathname();

  // Função centralizada para fechar removendo os parâmetros da URL (ex: ?modal=true)
  const fecharModal = () => {
    router.push(pathname, { scroll: false });
    // Nota: Se você abriu o modal usando <Link href="?modal=true">,
    // também pode usar router.back() aqui se preferir.
  };

  const cadastrarPerfil = (e) => {
    e.preventDefault();
    alert(
      "Post simulado com sucesso! (Em um cenário real, aqui dispararíamos uma Server Action para salvar no posts.json)",
    );
    // Chama a função recebida por prop para fechar o modal e limpar a URL
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

        <form className={styles.formulario} onSubmit={cadastrarPerfil}>
          <label
            htmlFor="username"
            placeholder="usuario123"
            alt="Email ou Usuário"
          >
            Email ou Usuário:
          </label>
          <input type="text" id="username" name="username" />
          <br />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
          <br />
          <button type="submit">Atualizar Perfil</button>
        </form>
      </div>
    </div>
  );
}
