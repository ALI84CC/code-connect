import { BarraBusca } from "@/components/BarraBusca";
import { getPostBySlug } from "@/lib/route.js";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";

// No Next.js atual, a propriedade params recebida na página é uma Promise!
export default async function PostPage({ params }) {
  // 1. Aguarda a Promise dos parâmetros resolver
  const { slug } = await params;

  // 2. Busca o post específico usando a função do servidor
  const post = getPostBySlug(slug);

  // 3. Se o post não existir no JSON, joga para a página 404 nativa
  if (!post) {
    notFound();
  }

  // 4. CORREÇÃO: Processa o Markdown vindo de 'post.body' usando o remark
  const processedContent = await remark().use(html).process(post.body);
  const contentHtml = processedContent.toString();

  return (
    <main
      style={{
        gap: "32px",
        MaxWidth: "993px",
        height: "946px",
        margin: "0 auto",
        color: "white",
        padding: "0 20px",
      }}
    >
      <BarraBusca />
      {/* Imagem de Capa do Post (Opcional, baseado no Figma) */}
      {post.cover && (
        <div
          style={{
            width: "993px",
            height: "348px",
            overflow: "hidden",
            borderRadius: "8px",
            padding: " 24px 16px",
            gap: "8px",
            backgroundColor: "#848484",
          }}
        >
          <img
            src={post.cover}
            alt={post.title}
            style={{
              width: "961px",
              height: "300px",
              borderRadius: "8px",
              padding: "12px",
              objectFit: "cover",
              gap: "12px",
            }}
          />
        </div>
      )}

      <div
        style={{
          display: "contents",
          alignItems: "center", // Alinha os blocos pelo topo
          marginTop: "24px",
        }}
      >
        <h1
          style={{ fontWeight: "bold", fontSize: "22px", lineHeight: "150%" }}
        >
          {post.title}
        </h1>

        <p style={{ fontWeight: "400", lineHeight: "150%", margin: "1.5px" }}>
          {post.body}
        </p>
      </div>
      {/* Dados do autor (Opcional, baseado no Figma) */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          margin: "20px 0px",
          color: "rgb(170, 170, 170)",
          width: "85px",
          height: "47px",
          flexShrink: 0,
        }}
      >
        <img
          src={post.author.avatar}
          alt={post.author.name}
          style={{
            width: "32px",
            height: "32px",
            fontWeight: "600",
            fontSize: "15px",
            lineHeight: " 150%",
            margin: "1.5px",
            borderRadius: "50%",
          }}
        />
        <p style={{ margin: 0, fontWeight: "bold" }}>{post.author.username}</p>
      </div>
      {/* 5. Renderiza o HTML gerado a partir do Markdown com segurança */}
      <div style={{ marginTop: "32px", lineHeight: "1.8", fontSize: "1.1rem" }}>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </main>
  );
}
