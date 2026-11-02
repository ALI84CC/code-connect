import { getPostBySlug } from "@/lib/route.js";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";
import DOMPurify from "isomorphic-dompurify";
// Importe o CardPost (ajuste o caminho se necessário)
import { CardPost } from "@/components/CardPost";

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
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        maxWidth: "993px",
        margin: "0 auto",
        color: "white",
        fontFamily: "sans-serif",
        padding: "40px 16px",
      }}
    >
      {/* CORREÇÃO AQUI: É obrigatório passar a prop post={post} para o componente do professor */}
      {post && <CardPost post={post} />}

      {/* Seção do Conteúdo Markdown (Código:) */}
      <div style={{ marginTop: "32px", lineHeight: "1.8", fontSize: "1.1rem" }}>
        <h1 style={{ color: "white", fontSize: "22px", marginBottom: "16px" }}>
          Código:
        </h1>
        <div
          style={{ background: "#888", width: "993px", height: "auto" }}
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      </div>
    </main>
  );
}
