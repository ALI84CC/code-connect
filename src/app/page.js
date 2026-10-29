import { BarraBusca } from "@/components/BarraBusca";
import { getAllPosts } from "@/lib/route";
import Link from "next/link";

export default function HomePage() {
  // Desestruturando corretamente a chave "posts" do seu posts.json
  const { posts } = getAllPosts();

  return (
    <main
      style={{
        padding: "40px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <BarraBusca />
      <h1 style={{ marginBottom: "32px", fontSize: "2rem" }}>Lista de Posts</h1>

      {/* GRID RESPONSIVO: Mobile-first simples que vira Grid em telas maiores */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "24px",
        }}
      >
        {posts.map((post) => (
          <article
            key={post.id}
            style={{
              backgroundColor: "#1E1E1E", // Ajuste para a cor de fundo do seu card no Figma
              color: "#FFFFFF",
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              border: "1px solid #333333",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Imagem de Capa */}
            <div
              style={{
                width: "100%",
                height: "200px",
                position: "relative",
                backgroundColor: "#2A2A2A",
              }}
            >
              <img
                src={post.cover}
                alt={post.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Conteúdo do Card */}
            <div
              style={{
                padding: "20px",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  margin: 0,
                  lineHeight: "1.4",
                }}
              >
                {post.title}
              </h2>

              <p
                style={{
                  color: "#CCCCCC",
                  fontSize: "0.95rem",
                  lineHeight: "1.5",
                  margin: 0,
                  flexGrow: 1,
                }}
              >
                {post.body}
              </p>

              {/* Link de Navegação para a Rota Dinâmica */}
              <Link
                href={`/posts/${post.slug}`}
                style={{
                  color: "#818CF8",
                  textDecoration: "underline",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  alignSelf: "flex-start",
                }}
              >
                Ver detalhes
              </Link>
            </div>

            {/* Rodapé com o Autor */}
            <div
              style={{
                padding: "16px 20px",
                borderTop: "1px solid #333333",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                backgroundColor: "#161616",
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>
                  {post.author.name}
                </span>
                <span style={{ fontSize: "0.75rem", color: "#888888" }}>
                  {post.author.username}
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
