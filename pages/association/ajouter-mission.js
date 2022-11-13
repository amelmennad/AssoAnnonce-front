import Button from "component/Button/Button";
import CheckboxInput from "component/Input/CheckboxInput";
import DateInput from "component/Input/DateInput";
import Textarea from "component/Input/Textarea";
import TextInput from "component/Input/TextInput";
import Mission from "component/Mission/Mission";
// import MissionList from "component/PageContainer/BlockContainer";
import PageContainer from "component/PageContainer/PageContainer";
import Loading from "component/Loading/Loading";

import Link from "next/link";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import styles from "../../styles/AddMission.module.scss";
import MissionList from "component/Mission/MissionList";

export default function AjouterAnnonce() {
  const [missionTitle, setMissionTitle] = useState("");
  const [invalidMissionTitle, setInvalidMissionTitle] = useState(false);
  const [place, setPlace] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [invalidJobDescription, setInvalidJobDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [groupedApplications, setGroupedApplications] = useState(false);
  const [limiteGroupCandidacy, setLimiteGroupCandidacy] = useState(0);
  const [invalidDate, setInvalidDate] = useState(false);

  const [validated, setValidated] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [missionData, setMissionData] = useState({});

  const router = useRouter();
  const checkDate = () => {
    const now = new Date();
    if (startDate < endDate) {
      setInvalidDate(false);
    } else {
      setInvalidDate(true);
    }
    if (startDate < now || endDate < now || startDate > endDate) {
      setInvalidDate(true);
    } else {
      setInvalidDate(false);
    }
  };

  const sendDate = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/association/mission/create`,
        data
      );
      setIsLoading(true);
      setMissionData(response.data);
      if (missionData) {
        router.push("/");
      }
    } catch (error) {
      console.log("file: ajouter-mission.js -> line 43 -> error", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (missionTitle.length < 20) {
      setValidated(false);
    }
    if (jobDescription.length < 500) {
      setValidated(false);
    }

    if (
      !missionTitle ||
      !jobDescription ||
      !startDate ||
      !endDate ||
      (groupedApplications && limiteGroupCandidacy < 1)
    ) {
      setValidated(false);
      e.stopPropagation();
    } else {
      const newMission = {
        missionTitle,
        place,
        jobDescription,
        startDate,
        endDate,
        groupedApplications,
      };

      if (groupedApplications && limiteGroupCandidacy > 0) {
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
          <PageContainer>
            <h2>Ajouter une nouvelle mission</h2>
            <form noValidate onSubmit={handleSubmit} className={styles.AddMissionForm}>
              <TextInput
                nameEn={"missionTitle"}
                nameFR={"Intitulé de la mission"}
                required={true}
                stateName={missionTitle}
                onChange={(e) => {
                  setMissionTitle(e.target.value);
                  if (e.target.value.length < 20) {
                    setInvalidMissionTitle(true);
                  } else {
                    setInvalidMissionTitle(false);
                  }
                }}
                validated={validated}
                invalid={invalidMissionTitle}
              />
              <TextInput
                nameEn={"place"}
                nameFR={"Lieu de la mission"}
                required={true}
                stateName={place}
                onChange={(e) => setPlace(e.target.value)}
                validated={validated}
              />
              <Textarea
                nameEn={"jobDescription"}
                nameFR={"Description et détails de la mission"}
                required={true}
                stateName={jobDescription}
                onChange={(e) => {
                  setJobDescription(e.target.value);
                  if (e.target.value.length < 500) {
                    setInvalidJobDescription(true);
                  } else {
                    setInvalidJobDescription(false);
                  }
                }}
                validated={validated}
                invalid={invalidJobDescription}
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
                  onBlur={(e) => {
                    setStartDate(e.target.value);
                    checkDate();
                  }}
                  validated={validated}
                  invalid={invalidDate}
                />
                <DateInput
                  nameEn={"endDate"}
                  nameFR={"Au"}
                  required={true}
                  stateName={endDate}
                  onBlur={(e) => {
                    setEndDate(e.target.value);
                    checkDate();
                  }}
                  validated={validated}
                  invalid={invalidDate}
                />
                {invalidDate && <p className="isInvalid">Les dates sont invalide</p>}
              </div>
              <CheckboxInput
                nameEn={"groupedApplications"}
                nameFR={"Autoriser les candidatures groupées"}
                stateName={groupedApplications}
                onChange={(e) => {
                  setGroupedApplications(!groupedApplications);
                  if (groupedApplications) {
                    setLimiteGroupCandidacy(0);
                  }
                }}
                validated={validated}
              />
              <div className={styles.limiteGroupCandidacy}>
                <label htmlFor="limiteGroupCandidacy">Limiter les candidature (par groupe) :</label>
                <input
                  type="number"
                  name="limiteGroupCandidacy"
                  id="limiteGroupCandidacy"
                  value={limiteGroupCandidacy}
                  onChange={(e) => setLimiteGroupCandidacy(e.target.value)}
                  className={
                    (!groupedApplications
                      ? ""
                      : !validated && groupedApplications && limiteGroupCandidacy < 1) ||
                    invalidJobDescription
                      ? "isInvalid"
                      : groupedApplications && limiteGroupCandidacy > 0
                      ? "isValid"
                      : ""
                  }
                />
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
