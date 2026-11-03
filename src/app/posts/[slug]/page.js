import { getPostBySlug } from "@/lib/route.js";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";
import DOMPurify from "isomorphic-dompurify";
import { CardPost } from "@/components/CardPost";

// 1. Importando o módulo de estilos da página
import styles from "./page.module.css";

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const processedContent = await remark().use(html).process(post.markdown);
  const rawHtml = processedContent.toString();
  const sanitizedHtml = DOMPurify.sanitize(rawHtml);

  return (
    // 2. Aplicando as classes limpas e sem estilos inline repetitivos
    <main className={styles.main}>
      {post && <CardPost post={post} highlighted={true} />}

      <div className={styles.contentSection}>
        <h1 className={styles.contentTitle}>Código:</h1>
        <div
          className={styles.codeContainer}
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      </div>
    </main>
  );
}
