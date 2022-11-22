/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import axios from "axios";
import PageContainer from "component/PageContainer/PageContainer";
import Loading from "component/Loading/Loading";
import Image from "next/image";
import Button from "component/Button/Button";
import MissionList from "component/Mission/MissionList";
import styles from "../../styles/Profil.module.scss";
import Img from "component/Img/Img";
import { useRouter } from "next/router";

export default function profil({ associationName, address, logo = "", description = "" }) {
  // console.log("file: [profil].js -> line 14 -> props", props);
  const [isLoading, setIsLoading] = useState(true);
  // const [userData, setUserData] = useState([]);
  const [missionData, setMissionData] = useState();
  const [srcValue, setSrcValue] = useState("");

  const router = useRouter();

  if (logo) {
    setSrcValue(logo.replace("https://res.cloudinary.com/", ""));
  }

  const defaultAvatar = ({ src, width }) => {
    return `https://res.cloudinary.com/${src}?w=${width}`;
  };

  // useEffect(() => {
  //   console.log(router);

  //   const storageUserData = JSON.parse(localStorage.getItem("assoAUserData"));
  //   const fetchData = async () => {
  //     const responseAssocociation = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BACKEND_API}/api/association/$${slug}`
  //     );
  //     setUserData(responseAssocociation.data);
  //     if (responseAssocociation.data.logo) {
  //       setSrcValue(responseAssocociation.data.logo.replace("https://res.cloudinary.com/", ""));
  //     }
  //     setIsLoading(false);
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const storageUserData = JSON.parse(localStorage.getItem("assoAUserData"));
  //   const fetchData = async () => {
  //     const responseMissions = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BACKEND_API}/api/association/missions/${storageid}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${storagetoken}`,
  //         }, // notice the Bearer before your token
  //       }
  //     );
  //     console.log("file: [profil].js -> line 46 -> responseMissions", responseMissions);
  //     if (responseMissions.data.length > 0) {
  //       setMissionData(responseMissions.data);
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className={styles.profil}>
      <div className={styles.user}>
        <div className={styles.logo}>
          <Img
            src={srcValue}
            // alt={firstName + "-" + lastName}
            width={150}
            height={150}
          />
        </div>
        <div className={styles.info}>
          <h2>{associationName}</h2>
          <h3>{address}</h3>
          <div>
            <Button type="button" name={"suivre"} />
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <h4>A propos de nous:</h4>
        {description ? (
          <p>{description}</p>
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
            <h3>Nos missions</h3>
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
            <h3>Nos actualites</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente, quo, veritatis
              itaque perspiciatis dolor praesentium maxime blanditiis, vel fugiat culpa nihil ab?
              Animi temporibus sint ad possimus dolorum doloribus maiores.
            </p>
          </PageContainer>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const slug = context.params.profil;

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/association/${slug}`
  );

  // if (response.data == "not found" || !response.data) {
  //   // return {
  //   //
  //   // };
  //   return { redirect: { destination: "/", permanent: false } };
  // }
  const data = response.data;
  console.log("file: [profil].js -> line 152 -> data", data);

  if (data.logo) {
    propData.logo = data.logo;
  }
  if (data.description) {
    propData.description = data.description;
  }

  return {
    props: data,
  };
}
