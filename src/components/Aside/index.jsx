import Image from "next/image";
import styles from "./aside.module.css";
import logo from "./logo.png";

export const Aside = () => {
  return (
    <aside className={styles.aside}>
      {/* <Image src={logo} alt="Logo do component" /> */}

      <Image
        src={logo}
        alt="Logo do component"
        style={{ width: "100%", height: "auto" }}
      />
    </aside>
  );
};
