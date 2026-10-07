import styles from "@/components/Avatar/avatar.module.css";

export const Avatar = ({ name, imgSrc }) => {
  return (
    <ul className={styles.ul}>
      <li>
        <img src={imgSrc} alt={`Avatar do(a) ${name}`} width={32} height={32} />
      </li>
      <li className={styles.li}> {name}</li>
    </ul>
  );
};
