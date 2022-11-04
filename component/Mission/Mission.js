import PageContainer from "component/PageContainer/PageContainer";
import styles from "./Mission.module.scss";
export default function Mission({ children }) {
  return <div className={styles.mission}>{children}</div>;
}
