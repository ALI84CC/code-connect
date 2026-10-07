// src/app/page.js
import postsData from "@/data/posts.json";
import { CardPost } from "@/components/CardPost";

export default function HomePage() {
  // Acessamos postsData.posts que é onde a lista real está guardada
  const listaDePosts = postsData.posts;

  return (
    <main style={{ padding: "20px", backgroundColor: "#070707" }}>
      <section style={{ display: "grid", gap: "20px" }}>
        {listaDePosts.map((post) => (
          <CardPost key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
}
