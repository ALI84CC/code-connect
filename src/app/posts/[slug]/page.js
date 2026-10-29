import { getPostBySlug } from "@/lib/posts"; // Ajuste o caminho se necessário
import { notFound } from "next/navigation";

// No Next.js atual, a propriedade params recebida na página é uma Promise!
export default async function PostPage({ params }) {
  // CORREÇÃO ATUAL: É obrigatório dar await em params antes de ler a propriedade
  const { slug } = await params;

  // Busca o post usando a nossa função do servidor
  const post = getPostBySlug(slug);

  // Se o slug digitado na URL não existir no JSON, joga para a página 404 nativa
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
