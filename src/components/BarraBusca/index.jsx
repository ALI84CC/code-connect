"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import search from "@/components/BarraBusca/search.png";

import styles from "./barraBusca.module.css";

export function BarraBusca() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Inicializa o estado com o termo que já está na URL (caso o usuário atualize a página)
  const [termo, setTermo] = useState(searchParams.get("q") || "");

  // Função que atualiza a URL com o termo buscado
  const lidarComBusca = (valor) => {
    setTermo(valor);

    const params = new URLSearchParams(searchParams.toString());

    // O .trim() limpa espaços extras para não gerar o "+" na URL
    const valorLimpo = valor.trim();

    if (valor) {
      params.set("q", valorLimpo);
    } else {
      params.delete("q"); // Remove o parâmetro se o campo for limpo
    }
    router.replace(`?${params.toString()}`);

    // Atualiza a URL sem recarregar a página inteira
    router.push(`?${params.toString()}`);

    // Sempre reseta para a página 1 ao fazer uma nova busca
    params.set("_page", "1");
  };
  return (
    <div className={styles.barraBusca}>
      <div className={styles.iconeBusca}>
        <div className={styles.inputContainer}>
          <Image
            className={styles.icone}
            src={search}
            alt="Ícone de busca"
            size={20} // Nota: no Next.js geralmente usa-se width={20} height={20}
          />
          <input
            type="text"
            name="busca"
            value={termo} // Corrigido de valur para value
            onChange={(e) => lidarComBusca(e.target.value)}
            placeholder="Digite o que você procura..."
            className={styles.inputBusca}
          />
        </div>
      </div>
      <button className={styles.botaoBusca}>Buscar</button>
    </div>
  );
}
