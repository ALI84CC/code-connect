import { getPostBySlug } from "@/lib/route.js"; // Ajuste o caminho se necessário
import { notFound } from "next/navigation";

export default async function PostPage({ params }) {
  // CORREÇÃO ATUAL: É obrigatório dar await em params antes de ler a propriedade
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{post.title}</h1>
      <div style={{ marginTop: "20px", lineHeight: "1.6" }}>
        <p>{post.content}</p>
      </div>
    </main>
  );
}
