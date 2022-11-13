import PageContainer from "component/PageContainer/PageContainer";
import styles from "./Mission.module.scss";

import Link from "next/link";

export default function MissionList({ key, id, missionTitle, place, startDate, endDate }) {
  return (
    <div className={styles.ourMissions}>
      <Link href={`/${id}`}>
        <a>
          <h4>{missionTitle}</h4>

          <p>{place}</p>

          <p>Du : {startDate}</p>
          <p>Au : {endDate}</p>
        </a>
      </Link>
    </div>
  );
}
