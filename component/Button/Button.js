import Link from "next/link";
import styles from "./Button.module.scss";

export default function Button({ name, type, href, className }) {
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
        <button type={type} className={styles.button}>
          {name}
        </button>
      )}
    </>
  );
}
