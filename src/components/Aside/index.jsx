import Image from "next/image";
import styles from "./aside.module.css";
import logo from "../Aside/Logo.png";
import buttons from "../Aside/buttons.png";
import feed from "../Aside/feed.png";
import account_circle from "../Aside/account_circle.png";
import info from "../Aside/info.png";
import logout from "../Aside/logout.png";

export const Aside = () => {
  return (
    <aside className={styles.aside}>
      {/* <Image src={logo} alt="Logo do component" /> */}
    <div className={styles.asideContent}>
      <Image
        src={logo}
        alt="Logo do component"
        style={{ width: "100%", height: "auto" }}
      />
      <Image
        src={buttons}
        alt="Botao Publicar"
        style={{ width: "117px", height: "57px" }}
      />
      <Image
        src={feed}
        alt="Botao de postagens"
        style={{ width: "32px", height: "32px" }}
      />
      <p style={{ margin: "0", padding: "0", color: "white" }}>Feed</p>
      <Image
        src={account_circle}
        alt="Botao do perfil  "
        style={{ width: "32px", height: "32px" }}
      />
      <p style={{ margin: "0", padding: "0", color: "white" }}>Perfil</p>
      <Image
        src={info}
        alt="Botao de informacoes"
        style={{ width: "32px", height: "32px" }}
      />
      <p style={{ margin: "0", padding: "0", color: "white" }}>Sobre Nós</p>
      <Image
        src={logout}
        alt="Botao de saida"
        style={{ width: "32px", height: "32px" }}
      />
      <p style={{ margin: "0", padding: "0", color: "white" }}>Sair</p>
      </div>
    </aside>
  );
};
