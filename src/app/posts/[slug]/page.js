import { BarraBusca } from "@/components/BarraBusca";
import { getPostBySlug } from "@/lib/route.js";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";

export default async function PostPage({ params }) {
  // CORREÇÃO ATUAL: É obrigatório dar await em params antes de ler a propriedade
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Processa o Markdown puro do banco de dados
  const processedContent = await remark().use(html).process(post.body);
  const contentHtml = processedContent.toString();

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
      {/* Barra de busca no topo */}
      <BarraBusca />

      {/* CARD INTEGRADO DO POST (Tudo em uma única caixa com fundo #1E1E1E) */}
      <article
        style={{
          width: "100%",
          backgroundColor: "#1E1E1E",
          borderRadius: "8px",
          border: "1px solid #333333",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Imagem de Capa do Post */}
        {post.cover && (
          <div style={{ width: "100%", height: "348px", overflow: "hidden" }}>
            <img
              src={post.cover}
              alt={post.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        {/* CONTAINER DO TEXTO + AUTOR (Onde acontece o alinhamento das pontas) */}
        <div
          style={{
            padding: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "24px",
          }}
        >
          {/* Lado Esquerdo: Título do Post */}
          <div style={{ flex: 1 }}>
            <h1
              style={{
                fontWeight: "bold",
                fontSize: "22px",
                lineHeight: "150%",
                margin: 0,
              }}
            >
              {post.title}
            </h1>
          </div>

          {/* Lado Direito: Bloco do Autor empurrado para o canto direito */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#888888",
              flexShrink: 0,
            }}
          >
            <img
              src={post.author.avatar}
              alt={post.author.name}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <span
              style={{
                fontWeight: "600",
                fontSize: "15px",
                lineHeight: "150%",
                color: "#BCBCBC",
              }}
            >
              {post.author.username}
            </span>
          </div>
        </div>
      </article>

      {/* CONTEÚDO DO MARKDOWN */}
      <section
        style={{
          marginTop: "16px",
          lineHeight: "1.8",
          fontSize: "1rem",
          color: "#E1E1E6",
          width: "100%",
        }}
      >
        {/* Injeta a regra CSS para capturar as tags geradas dinamicamente */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .conteudo-markdown img {
            max-width: 40px !important;
            height: 40px !important;
            border-radius: 50% !important;
            object-fit: cover !important;
            display: inline-block !important;
            margin-right: 8px !important;
            vertical-align: middle !important;
          }
        `,
          }}
        />

        <div
          className="conteudo-markdown"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </section>
    </main>
  );
}
