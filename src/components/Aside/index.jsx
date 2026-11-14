"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import styles from "./aside.module.css";

import logo from "./Logo.png";
import feed from "./feed.png";
import account_circle from "./account_circle.png";
import info from "./info.png";
import logout from "./logout.png";

import ModalPublicar from "@/components/ModalPublicar";
import ModalPerfil from "@/components/perfil";

export default function Aside({ children }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const modalAtivo = searchParams.get("modal");

  const fecharModal = () => {
    router.push(pathname, { scroll: false });
  };

  return (
    <>
      <aside className={styles.aside}>
        <div className={styles.asideContent}>
          <Image
            src={logo}
            alt="Logo do component"
            style={{ width: "100%", height: "auto" }}
          />

          <Link href="?modal=publicar" className={styles.botaoPublicar}>
            Publicar
          </Link>

          <Link href="?modal=feed" className={styles.itemMenu}>
            <Image src={feed} alt="Botão de postagens" width={32} height={32} />
            <span>Feed</span>
          </Link>

          <Link href="?modal=perfil" className={styles.itemMenu}>
            <Image
              src={account_circle}
              alt="Botão do perfil"
              width={32}
              height={32}
            />
            <span>Perfil</span>
          </Link>

          <Link href="?modal=SobreNos" className={styles.itemMenu}>
            <Image
              src={info}
              alt="Botão de informações"
              width={32}
              height={32}
            />
            <span>Sobre Nós</span>
          </Link>

          <div className={styles.itemMenu}>
            <Image src={logout} alt="Botão de saída" width={32} height={32} />
            <span>Sair</span>
          </div>
        </div>
      </aside>

      {/* Só mantenha essa linha se você estiver passando páginas por dentro do <Aside> no layout.js */}
      {children}

      {/* Modal flutuante (não afeta o layout do menu) */}
      {/* 2. Conexão feita: exibe o ModalPublicar quando o link for clicado */}
      {modalAtivo === "publicar" && <ModalPublicar aoFechar={fecharModal} />}
      {modalAtivo === "perfil" && <ModalPerfil aoFechar={fecharModal} />}
    </>
  );
}
