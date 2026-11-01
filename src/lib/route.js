import fs from "fs";
import path from "path";

// Uso interno: ninguém de fora precisa ver ou importar isso
const jsonPath = path.join(process.cwd(), "src", "data", "posts.json");

export function getAllPosts() {
  const fileData = fs.readFileSync(jsonPath, "utf-8");
  const dadosCompletos = JSON.parse(fileData);
  return dadosCompletos.posts;
}

export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}
