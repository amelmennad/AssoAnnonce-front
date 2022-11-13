import PageContainer from "component/PageContainer/PageContainer";
import styles from "./Mission.module.scss";

import Link from "next/link";
import Img from "component/Img/Img";

export default function OneMission({
  key,
  src,
  alt,
  missionTitle,
  place,
  startDate,
  endDate,
  associationName,
}) {
  return (
    <div key={key} className={styles.oneMission}>
      <Link href="/mission">
        <a>
          <div className={styles.dataOneMission}>
            {src && (
              <div className={styles.logoAssosiation}>
                <Img
                  src={src.replace("https://res.cloudinary.com/", "")}
                  alt={alt}
                  width={150}
                  height={150}
                />
              </div>
            )}
            <div className={styles.detailMission}>
              <h4>{missionTitle}</h4>
              <h5>{place}</h5>
              {associationName && <p>{associationName}</p>}
            </div>

            <div className={styles.dateMission}>
              <p>Du : {startDate}</p>
              <p>Au : {endDate}</p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
