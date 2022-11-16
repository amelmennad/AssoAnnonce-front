/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import axios from "axios";
import PageContainer from "component/PageContainer/PageContainer";
import Loading from "component/Loading/Loading";
import Button from "component/Button/Button";
import MissionList from "component/Mission/MissionList";
import Img from "component/Img/Img";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Mission() {
  const [isLoading, setIsLoading] = useState(true);
  const [missionData, setMissionData] = useState([]);
  const [srcValue, setSrcValue] = useState("");
  console.log("file: [profil].js -> line 17 -> srcValue", srcValue);
  const router = useRouter();

  useEffect(() => {
    const idMission = router.query.mission;
    console.log("file: [mission].js -> line 21 -> idMission", idMission);

    const fetchData = async () => {
      const responseMission = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/mission/${idMission}`
      );

      console.log("file: [mission].js -> line 28 -> responseMission.data)", responseMission.data);
      setMissionData(responseMission.data);
      setIsLoading(false);

      if (responseMission.data.logo) {
        setSrcValue(response.data.logo.replace("https://res.cloudinary.com/", ""));
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <PageContainer>
      <h2>{missionData.missionTitle}</h2>
      <Link href="">
        <a>
          <h3>{missionData.association.associationName}</h3>
        </a>
      </Link>

      <div>
        <div>
          <p>{missionData.place}</p>
        </div>
        <div>
          <p>Du : {missionData.startDate}</p>
          <p>Au : {missionData.endDate}</p>
        </div>
      </div>

      <p>{missionData.jobDescription}</p>
    </PageContainer>
  );
}
