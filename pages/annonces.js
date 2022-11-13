import { useEffect, useState } from "react";
import axios from "axios";
import PageContainer from "component/PageContainer/PageContainer";
import TextInput from "component/Input/TextInput";
import Img from "component/Img/Img";
import styles from "../styles/Annonces.module.scss";
import Link from "next/link";
import Button from "component/Button/Button";

export default function Annonces() {
  const [isLoading, setIsLoading] = useState(true);
  const [missionsData, setMissionsData] = useState([]);
  const [emptyMission, setEmptyMissionData] = useState(false);
  const [srcValue, setSrcValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const responseMissions = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/missions`
      );
      console.log("file: [profil].js -> line 19 -> response", responseMissions.data);

      if (responseMissions.data.length > 0) {
        setMissionsData(responseMissions.data);
        setIsLoading(false);
      } else {
        setEmptyMissionData(true);
      }
    };
    fetchData();
  }, []);
  return (
    <PageContainer>
      <h1>Annonces</h1>
      <div>
        <form noValidate>
          <TextInput />
        </form>
      </div>
      <div className={styles.allMissions}>
        <h4>{missionsData.length} touvée</h4>
        {missionsData.map((mission, key) => {
          const { missionTitle, place, startDate, endDate, _id } = mission;
          const { associationName, logo } = mission.association;
          return (
            <Link key={key} href={`/${_id}`}>
              <a>
                <div className={styles.oneMission}>
                  <div className={styles.logoAssosiation}>
                    <Img
                      src={logo.replace("https://res.cloudinary.com/", "")}
                      alt={associationName}
                      width={75}
                      height={75}
                    />
                  </div>
                  <div className={styles.detailMission}>
                    <h3>{missionTitle}</h3>
                    <h4>{place}</h4>
                    <p>{associationName}</p>
                  </div>
                  <div className={styles.dateMission}>
                    <p> Du : {startDate}</p>
                    <p> Au : {endDate}</p>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </PageContainer>
  );
}
/*

{missionsData.map((mission, key) => {
          const { missionTitle, place, startDate, endDate } = mission;
          const { associationName, logo } = mission.association;

          return (
            <OneMission
              key={key}
              missionTitle={missionTitle}
              place={place}
              startDate={startDate}
              endDate={endDate}
              associationName={associationName}
              src={logo}
              alt={associationName}
              stylesName={stylesName}
            />
          );
        })}
        */
