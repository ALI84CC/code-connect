import logger from "@/logger";
import Image from "next/image";
import Link from "next/link";

async function getPostBySlug(slug) {
  logger.info(`Iniciando a busca do post pelo slug: ${slug}`);
  try {
    const reponse = await fetch(`http://localhost:3001/posts?slug=${slug}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      logger.error("Erro na requisição");
      return null;
    }

    const data = await response.json();

    if (data.length === 0) {
      logger.warn(`Nenhum post encontrado com o slug: ${slug}`);
      return null;
    }

    logger.info(`Post carregado com sucesso via API.`);
    return data[0]; // Retorna o primeiro post encontrado
  } catch (error) {
    logger.error(`Falha ao conectar com o json-server: ${error.message}`);
    return null;
  }
}

// 1. A função do componente de página PRECISA ser exportada como default e ser async
export default async function PagePost({ params }) {
  // 2. É necessário dar await nos params para pegar o slug de forma segura
  const { slug } = await params;

  // 3. Aguarda o retorno da função que busca na API
  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <div style={{ padding: "20px", color: "#fff" }}>
        <h1>Post não encontrado</h1>
        <Link href="/">Voltar para a Home</Link>
      </div>
    );
  }
  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      <Link href="/" style={{ color: "#fff", textDecoration: "underline" }}>
        ← Voltar para a listagem
      </Link>

      <div style={{ marginTop: "20px" }}>
        <Image
          src={post.cover}
          alt={`Capa do post: ${post.title}`}
          width={430}
          height={133}
          priority
        />

        {/* Descomente e ajuste se os componentes existirem */}
        {/* <Avatar imgSrc={post.author.avatar} /> */}
        <span>@{post.author.username}</span>

        <h1 style={{ fontSize: "2rem", margin: "10px 0" }}>{post.title}</h1>
        <p style={{ opacity: 0.8 }}>{post.body}</p>

        <div
          style={{
            marginTop: "20px",
            background: "#222",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h3>Markdown do Post:</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{post.markdown}</pre>
        </div>
      </div>
    </div>
  );
}
