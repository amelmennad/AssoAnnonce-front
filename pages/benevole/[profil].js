/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import axios from "axios";
import PageContainer from "component/PageContainer/PageContainer";
import Loading from "component/Loading/Loading";
import Button from "component/Button/Button";
import MissionList from "component/Mission/MissionList";
import styles from "../../styles/Profil.module.scss";
import Img from "component/Img/Img";
import Image from "next/image";
import { useRouter } from "next/router";

export default function profil({ firstName, lastName, birthday, avatar = "", aboutme = "" }) {
  const [srcValue, setSrcValue] = useState("");

  const [missionData, setMissionData] = useState();
  const [noteData, setNoteData] = useState();

  const diff = new Date(Date.now() - new Date(birthday).getTime());

  if (avatar) {
    setSrcValue(avatar.replace("https://res.cloudinary.com/", ""));
  }

  const defaultAvatar = ({ src, width }) => {
    return `https://res.cloudinary.com/${src}?w=${width}`;
  };

  return (
    <div className={styles.profil}>
      <div className={styles.user}>
        <div className={styles.avatar}>
          <Img
            src={srcValue}
            alt={firstName + "-" + lastName}
            width={150}
            height={150}
            status="volunteer"
          />
        </div>
        <div className={styles.info}>
          <h2>
            {firstName} {lastName}
          </h2>
          <h3>{Math.abs(diff.getUTCFullYear() - 1970)} ans</h3>
        </div>
      </div>
      <div className={styles.aboutme}>
        <h4>A propos de moi:</h4>
        {aboutme ? (
          <p>{aboutme}</p>
        ) : (
          <p>Aucune description disponible</p>
          // <Button
          //   type="button"
          //   name={"Ajouter une desciption"}
          //   // href={"/benevole/modifier"}
          // />
        )}
      </div>
      <div className={styles.listContent}>
        <div className={styles.divList}>
          <PageContainer>
            <h3>Mes Dernières Missions</h3>
            {!missionData ? (
              <p>Aucune mission réalisée pour le moment</p>
            ) : (
              missionData.map((mission, key) => {
                return (
                  <MissionList
                    key={key}
                    id={mission._id}
                    missionTitle={mission.missionTitle}
                    place={mission.place}
                    startDate={mission.startDate}
                    endDate={mission.endDate}
                  />
                );
              })
            )}
          </PageContainer>
        </div>
        <div className={styles.divList}>
          <PageContainer>
            <h3>Mes Avis</h3>
            {!noteData ? (
              <p>Aucun avis pour le moment</p>
            ) : (
              noteData.map((mission, key) => {
                return (
                  <MissionList
                    key={key}
                    id={mission._id}
                    missionTitle={mission.missionTitle}
                    place={mission.place}
                    startDate={mission.startDate}
                    endDate={mission.endDate}
                  />
                );
              })
            )}
          </PageContainer>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const slug = context.params.profil;

  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/volunteer/${slug}`);
  // if (response.data == "not found" || !response.data) {
  //   // return {
  //   //
  //   // };
  //   return { redirect: { destination: "/", permanent: false } };
  // }
  const data = response.data;

  if (data.avatar) {
    propData.avatar = data.avatar;
  }
  if (data.aboutme) {
    propData.aboutme = data.aboutme;
  }

  return {
    props: data,
  };
}
