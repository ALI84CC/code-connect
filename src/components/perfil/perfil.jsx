'use client'
import styles from "@/components/perfil/perfil.modules.css";

export function ModalPublicar() {
  const cadastrarPerfil  = (e) => {
    e.preventDefault();
    alert('Post simulado com sucesso! (Em um cenário real, aqui dispararíamos uma Server Action para salvar no posts.json)');
    // Redireciona para fechar o modal
    window.location.search = '';
  };

  return (
    <div className={styles.overlay}>
      <form onSubmit={cadastrarPerfil} >
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
  );
}