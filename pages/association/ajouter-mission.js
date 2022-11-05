import Button from "component/Button/Button";
import CheckboxInput from "component/Input/CheckboxInput";
import DateInput from "component/Input/DateInput";
import Textarea from "component/Input/Textarea";
import TextInput from "component/Input/TextInput";
import Mission from "component/Mission/Mission";
import MissionList from "component/Mission/MissionList";
import PageContainer from "component/PageContainer/PageContainer";
import Loading from "component/Loading/Loading";

import Link from "next/link";
import React from "react";
import { useState } from "react";

import styles from "../../styles/AddMission.module.scss";

export default function AjouterAnnonce() {
  const [missionTitle, setMissionTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [groupedApplications, setGroupedApplications] = useState(false);
  const [missionData, setMissionData] = useState({});

  const [validated, setValidated] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  // const checkStartDate = () => {};
  const sendDate = async (data) => {
    try {
      console.log("file: ajouter-mission.js -> line 32 -> data", data);
      // const response = await axios.post(
      // `${process.env.NEXT_PUBLIC_BACKEND_API}/api/association/createMission`,
      //   data
      // );
      // setIsLoading(true);
      // setData(response.data);
      // if (data) {
      //   // router.push("/");
      // }
    } catch (error) {
      console.log("file: ajouter-mission.js -> line 43 -> error", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (missionTitle.length < 55) {
      setValidated(false);
    }
    if (jobDescription.length < 500) {
      setValidated(false);
    }
    if (!missionTitle || !jobDescription || !startDate || !endDate) {
      setValidated(false);
      e.stopPropagation();
    } else {
      console.log("toto");
      const newMission = {
        missionTitle,
        jobDescription,
        startDate,
        endDate,
        groupedApplications,
      };
      if (groupedApplications && groupedApplications) {
        newMission.groupedApplications = groupedApplications;
      }
      setIsLoading(true);
      sendDate(newMission);
    }
  };
  return (
    <Mission>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <MissionList missionData={missionData} />
          <PageContainer>
            <h2>Ajouter une nouvelle mission</h2>
            <form noValidate onSubmit={handleSubmit} className={styles.AddMissionForm}>
              <TextInput
                nameEn={"missionTitle"}
                nameFR={"Intitulé de la mission"}
                required={true}
                stateName={missionTitle}
                onChange={(e) => setMissionTitle(e.target.value)}
                validated={validated}
              />
              <Textarea
                nameEn={"jobDescription"}
                nameFR={"Description et détails de la mission"}
                required={true}
                stateName={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                validated={validated}
                cols={"30"}
                rows={"20"}
              />
              <label>Date et durer de mission</label>
              <div className={styles.missionDate}>
                <DateInput
                  nameEn={"startDate"}
                  nameFR={"Du"}
                  required={true}
                  stateName={startDate}
                  onBlur={(e) => setStartDate(e.target.value)}
                  validated={validated}
                  // invalid={checkStartDate}
                />
                <DateInput
                  nameEn={"endDate"}
                  nameFR={"Au"}
                  required={true}
                  stateName={endDate}
                  onBlur={(e) => setEndDate(e.target.value)}
                  validated={validated}
                  // invalid={checkStartDate}
                />
              </div>
              <CheckboxInput
                nameEn={"groupedApplications"}
                nameFR={"Autoriser les candidatures groupées"}
                stateName={groupedApplications}
                onChange={(e) => setGroupedApplications(!groupedApplications)}
                validated={validated}
              />
              <div className={styles.limiteGroupcandidacy}>
                <label htmlFor="limiteGroupcandidacy">
                  Limiter les candidature (par groupe) :{" "}
                </label>
                <input type="number" name="limiteGroupcandidacy" id="limiteGroupcandidacy" />
              </div>
              <div className={styles.btn}>
                <Button type="submit" name={"Poster"} />
              </div>
            </form>
          </PageContainer>
        </>
      )}
    </Mission>
  );
}
