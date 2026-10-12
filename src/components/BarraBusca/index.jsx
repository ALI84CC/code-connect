import styles from "./barraBusca.module.css";
import Image from "next/image";

export const BarSearch = (params) => {
  return (
    <div className={styles.barraBusca}>
      <div className={styles.iconeBusca}>
        <div className={styles.inputContainer}>
          <Image
            src="/search.png"
            alt="Ícone de busca"
            width={25}
            height={25}
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
