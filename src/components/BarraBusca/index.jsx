import styles from "./barraBusca.module.css";
import Image from "next/image";
import search from "@/components/BarraBusca/search.png";

export const BarraBusca = (params) => {
  return (
    <div className={styles.barraBusca}>
      <div className={styles.iconeBusca}>
        <div className={styles.inputContainer}>
          <Image
            className={styles.icone}
            src={search}
            alt="Ícone de busca"
            size={20}
          />
          <input
            type="text"
            name="busca"
            placeholder="Digite o que você procura..."
            className={styles.inputBusca}
          />
        </div>
      </div>
      <button className={styles.botaoBusca}>Buscar</button>
    </div>
  );
};
