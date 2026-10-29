import fs from "fs";
import path from "path";

// CORREÇÃO: Entra na pasta 'src', depois em 'app' e por fim em 'posts' para achar o arquivo
const jsonPath = path.join(process.cwd(), "src", "data", "posts.json");

// Função para buscar TODOS os posts
export function getAllPosts() {
  const fileData = fs.readFileSync(jsonPath, "utf-8");
  return JSON.parse(fileData);
}

// Aproveite para garantir que a função de buscar por Slug também está aqui:
export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}
