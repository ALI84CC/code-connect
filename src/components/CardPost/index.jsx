import Image from "next/image";
import { Avatar } from "../Avatar";
// 1. Importe o arquivo de estilos (ajuste o nome do arquivo se o seu estiver diferente)
import styles from "./cardpost.module.css";

export const CardPost = ({ post }) => {
  return (
    // 2. Aplique as classes usando a sintaxe 'styles.nomeDaClasse'
    <article className={styles.card}>
      <header className={styles.header}>
        <figure className={styles.figure}>
          <Image
            src={post.cover}
            alt={`Capa do post: ${post.title}`}
            width={438}
            height={133}
            priority
          />
        </figure>
      </header>
      <section className={styles.section}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.body}>{post.body}</p>
        <a href={post.markdown}>Ver detalhe...</a>
      </section>
      <footer className={styles.footer}>
        {post.author && (
          <>
            <Avatar imgSrc={post.author.avatar} />
            <span className={styles.username}>@{post.author.username}</span>
          </>
        )}
      </footer>
    </article>
  );
};
