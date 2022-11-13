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

export default function profil() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [age, setUserAge] = useState(0);
  const [srcValue, setSrcValue] = useState("");
  console.log("file: [profil].js -> line 17 -> srcValue", srcValue);

  useEffect(() => {
    const storageUserData = JSON.parse(localStorage.getItem("assoAUserData"));
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/volunteer/${storageUserData.id}`,
        {
          headers: {
            Authorization: `Bearer ${storageUserData.token}`,
          }, // notice the Bearer before your token
        }
      );
      console.log(`http://localhost:3100/api/volunteer/${storageUserData.id}`);
      if (response.data) {
        console.log("file: [profil].js -> line 19 -> response", response.data);
        setUserData(response.data);
        setIsLoading(false);

        const diff = new Date(Date.now() - new Date(response.data.birthday).getTime());
        const age = Math.abs(diff.getUTCFullYear() - 1970);
        setUserAge(age);
        // if (response.data.avatar) {
        //   setSrcValue(response.data.avatar.replace("https://res.cloudinary.com/", ""));
        // } else {
        //   setSrcValue("dl6lvmsml/image/upload/v1668269419/volunteer/default-avatar_zusmrb.jpg");
        // }
        if (response.data.avatar) {
          setSrcValue(response.data.avatar.replace("https://res.cloudinary.com/", ""));
        }
      }
    };
    fetchData();
  }, []);

  const defaultAvatar = ({ src, width }) => {
    return `https://res.cloudinary.com/${src}?w=${width}`;
    // }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className={styles.profil}>
      <div className={styles.user}>
        <Img
          // setSrcValue={setSrcValue}
          // srcValue={srcValue}
          src={srcValue}
          alt={userData.firstName + "-" + userData.lastName}
          width={150}
          height={150}
        />

        <div className={styles.info}>
          <h2>
            {userData.firstName} {userData.lastName}
          </h2>
          <h3>{age} ans</h3>
        </div>
      </div>
      <div className={styles.aboutme}>
        <h4>A propos de moi:</h4>
        {userData.aboutme ? (
          <p>{userData.aboutme}</p>
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
          <MissionList />
        </div>
        <div className={styles.divList}>
          <MissionList />
        </div>
      </div>
    </div>
  );
}
