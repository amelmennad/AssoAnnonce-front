import Link from "next/link";
import styles from "./Button.module.scss";

export default function Button({ name, type, href, className, click }) {
  return (
    <>
      {href ? (
        <Link href={href}>
          <button type={type} className={styles.button}>
            <a>{name}</a>
          </button>
          {}
        </Link>
      ) : (
        <button type={type} className={styles.button} onClick={click}>
          {name}
        </button>
      )}
    </>
  );
}
