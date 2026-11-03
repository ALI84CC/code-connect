import Image from "next/image";
import Link from "next/link";
import { Avatar } from "../Avatar";
import styles from "./cardpost.module.css";

export const CardPost = ({ post, highlighted }) => {
  return (
    <Link href={`/posts/${post.slug}`} className={styles.link}>
      {/* Classe dinâmica: adiciona a variação destacada se highlighted for true */}
      <article
        className={`${styles.card} ${highlighted ? styles.highlighted : ""}`}
      >
        <header className={styles.header}>
          <figure className={styles.figure}>
            <Image
              src={post.cover} // Puxa o link do posts.json
              alt={`Capa do post: ${post.title}`}
              fill // Preenche o container <figure> automaticamente
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 993px" // Otimização de entrega
              priority={highlighted} // Carrega instantaneamente se for o card principal
            />
          </figure>
        </header>
        <section className={styles.section}>
          <h2 className={styles.title}>{post.title}</h2>
          <p className={styles.body}>{post.body}</p>
          <span>Ver detalhe...</span>
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
    </Link>
  );
};
