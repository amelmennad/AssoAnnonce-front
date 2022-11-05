import PageContainer from "component/PageContainer/PageContainer";
import styles from "./Mission.module.scss";

import Link from "next/link";

export default function MissionList() {
  return (
    <PageContainer>
      <h3>Nos missions</h3>
      <article className={styles.ourMissions}>
        <Link href="/mission">
          <h4>Animateur pour une carmesse</h4>
        </Link>
        <p>Seine-et-Marne-77000</p>

        <p>Du : 25/02/2023</p>
        <p>Au : 26/02/2023</p>
      </article>
      <article className={styles.ourMissions}>
        <h4>Animateur pour une carmesse</h4>
        <p>Seine-et-Marne-77000</p>

        <p>Du : 25/02/2023</p>
        <p>Au : 26/02/2023</p>
      </article>
    </PageContainer>
  );
}
