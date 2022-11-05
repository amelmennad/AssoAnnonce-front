import ButtonCustom from "component/Button/Button";
import PageContainer from "component/PageContainer/PageContainer";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import styles from "../../styles/Inscription.module.scss";
import TextInput from "component/Input/TextInput";
import FileInput from "component/Input/FileInput";
import YesNoRadioInput from "component/Input/YesNoRadioInput";
import PasswordInput from "component/Input/PasswordInput";
import EmailInput from "component/Input/EmailInput";
import Loading from "component/Loading/Loading";
import CheckboxInput from "component/Input/CheckboxInput";

function Inscription() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [powerDelegation, setPowerDelegation] = useState("");
  const [powerDelegationFile, setPowerDelegationFile] = useState("");
  const [associationStatutes, setAssociationStatutes] = useState("");
  const [interiorRules, setInteriorRules] = useState("");
  const [secondaryEstablishment, setSecondaryEstablishment] = useState(false);
  const [address, setAddress] = useState("");
  const [rnaNumber, setRnaNumber] = useState("");
  const [sirene, setSirene] = useState(false);
  const [sireneNumber, setSireneNumber] = useState("");
  const [associationName, setAssociationName] = useState("");
  const [objectAssociation, setObjectAssociation] = useState("");
  const [headOffice, setHeadOffice] = useState("");
  const [joafePublication, setJoafePublication] = useState("");
  const [publicUtility, setPublicUtility] = useState(false);
  const [approvale, setApprovale] = useState(false);
  const [needInsurance, setNeedInsurance] = useState(false);
  const [alsaceMoselleLaw, setAlsaceMoselleLaw] = useState(false);
  const [publicUtilityNotification, setPublicUtilityNotification] = useState("");
  const [approvaleCertificate, setApprovaleCertificate] = useState("");
  const [insuranceCopy, setInsuranceCopy] = useState("");
  const [password, setPassword] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [noMatchPassword, setNoMatchPassword] = useState(false);
  const [cgu, setCgu] = useState(false);
  const [validated, setValidated] = useState(true);
  const [dataExist, setDataExist] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const router = useRouter();

  const handleChangeEmail = (e) => {
    setInvalidEmail(false);
    setEmail(e.target.value);

    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    if (!emailRegex.test(e.target.value)) {
      setInvalidEmail(true);
    }
  };

  const handleChangePassword = (e) => {
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){7,}$/;

    setPassword(e.target.value);
    setInvalidPassword(false);

    if (e.target.value.length <= 7) {
      setInvalidPassword(true);
    }
    if (!passwordRegex.test(e.target.value)) {
      setInvalidPassword(true);
    }
  };

  const fileUrl = (e) => {
    return {
      name: e.target.files[0].name,
      size: e.target.files[0].size,
      type: e.target.files[0].type,
      path: URL.createObjectURL(e.target.files[0]),
    };
  };
  const comparePassword = (e) => {
    setConfirmPassword(e.target.value);
    setNoMatchPassword(false);

    if (password !== e.target.value) {
      setNoMatchPassword(true);
    }
    if (password === e.target.value) {
      setNoMatchPassword(false);
    }
  };

  const sendDate = async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/association/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsLoading(true);
      setData(response.data);
      if (data) {
        router.push("/association/profil");
      }
    } catch (error) {
      setDataExist(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (publicUtility && !publicUtilityNotification) {
      setValidated(false);
    }
    if (approvale && !approvaleCertificate) {
      setValidated(false);
    }
    if (needInsurance && !insuranceCopy) {
      setValidated(false);
    }
    if (sirene && !sireneNumber) {
      setValidated(false);
    }
    if (
      !lastName ||
      !firstName ||
      !email ||
      invalidEmail ||
      !address ||
      !powerDelegation ||
      !associationStatutes ||
      !interiorRules ||
      !associationName ||
      !objectAssociation ||
      !headOffice ||
      !rnaNumber ||
      !joafePublication ||
      !password ||
      invalidPassword ||
      !confirmPassword ||
      noMatchPassword ||
      !cgu
    ) {
      setValidated(false);
      e.stopPropagation();
    } else {
      const formData = new FormData();
      formData.append("lastName", lastName);
      formData.append("firstName", firstName);
      formData.append("email", email);
      formData.append("address", address);
      formData.append("powerDelegation", powerDelegation);
      formData.append("associationStatutes", associationStatutes);
      formData.append("interiorRules", interiorRules);
      formData.append("secondaryEstablishment", secondaryEstablishment);
      formData.append("associationName", associationName);
      formData.append("objectAssociation", objectAssociation);
      formData.append("headOffice", headOffice);
      formData.append("rnaNumber", rnaNumber);
      formData.append("joafePublication", joafePublication);
      formData.append("alsaceMoselleLaw", alsaceMoselleLaw);
      formData.append("password", password);
      formData.append("cgu", cgu);

      if (publicUtility && publicUtilityNotification) {
        formData.append("publicUtility", publicUtility);
        formData.append("publicUtilityNotification", publicUtilityNotification);
      } else {
        formData.append("publicUtility", publicUtility);
      }
      if (approvale && approvaleCertificate) {
        formData.append("approvale", approvale);
        formData.append("approvaleCertificate", approvaleCertificate);
      } else {
        formData.append("approvale", approvale);
      }
      if (needInsurance && insuranceCopy) {
        formData.append("needInsurance", needInsurance);
        formData.append("insuranceCopy", insuranceCopy);
      } else {
        formData.append("needInsurance", needInsurance);
      }
      if (sirene && sireneNumber) {
        formData.append("sirene", sirene);
        formData.append("sireneNumber", sireneNumber);
      } else {
        formData.append("sirene", sirene);
      }
      setIsLoading(true);
      const response = sendDate(formData);
    }
  };

  return (
    <PageContainer>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.register}>
          <div>
            <h2>Inscription</h2>
            <h3>Association</h3>
          </div>

          <form noValidate onSubmit={handleSubmit}>
            {!validated && (
              <p className={"isInvalid"}>Les champs en rouges doivent etres remplis et valide</p>
            )}
            {dataExist && (
              <p className={"isInvalid"}>
                Certaine donnée unique sont déjà enregistrés chez nous, essayez de vous
                <span>
                  <Link href="/identification">
                    <a> connecter</a>
                  </Link>
                </span>
              </p>
            )}
            <fieldset>
              <legend>Identité du Gestionnaire</legend>
              <TextInput
                nameEn={"lastName"}
                nameFR={"Nom"}
                required={true}
                stateName={lastName}
                onChange={(e) => setLastName(e.target.value)}
                validated={validated}
              />
              <TextInput
                nameEn={"firstName"}
                nameFR={"Prénom"}
                required={true}
                stateName={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                validated={validated}
              />
              <EmailInput
                nameEn={"email"}
                nameFR={"Adresse e-mail"}
                required={true}
                stateName={email}
                onChange={handleChangeEmail}
                validated={validated}
                invalid={invalidEmail}
              />
              <TextInput
                nameEn={"address"}
                nameFR={"Adresse de l'association"}
                required={true}
                stateName={address}
                onChange={(e) => setAddress(e.target.value)}
                validated={validated}
              />
              <FileInput
                nameEn={"powerDelegation"}
                nameFR={"Délégation de pouvoir prévue à l'embauche"}
                required={true}
                stateName={powerDelegation}
                validated={validated}
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  if (e.target.files[0].type === "application/pdf") {
                    setPowerDelegation(e.target.files[0]);
                  } else {
                    setPowerDelegation("invalid");
                  }
                }}
              />
              <FileInput
                nameEn={"associationStatutes"}
                nameFR={"Statuts de l'association"}
                required={true}
                stateName={associationStatutes}
                validated={validated}
                onChange={(e) => {
                  if (e.target.files[0].type === "application/pdf") {
                    setAssociationStatutes(e.target.files[0]);
                  } else {
                    setAssociationStatutes("invalid");
                  }
                }}
              />
              <FileInput
                nameEn={"interiorRules"}
                nameFR={"Règlement intérieur"}
                required={true}
                stateName={interiorRules}
                validated={validated}
                onChange={(e) => {
                  if (e.target.files[0].type === "application/pdf") {
                    setInteriorRules(e.target.files[0]);
                    // setInteriorRules(fileUrl(e));
                  } else {
                    setInteriorRules("invalid");
                  }
                }}
              />
            </fieldset>

            <fieldset>
              <legend>Identité de l&apos;association</legend>
              <YesNoRadioInput
                nameEn={"secondaryEstablishment"}
                nameFR={"Etes-vous un etablissement secondaire"}
                required={true}
                stateName={secondaryEstablishment}
                onChange={(e) => {
                  if (e.target.value === "yes") {
                    setSecondaryEstablishment(true);
                  } else {
                    setSecondaryEstablishment(false);
                  }
                }}
                validated={validated}
                yesId={"secondaryEstablishmentYes"}
                noId={"secondaryEstablishmentNo"}
              />
              <TextInput
                nameEn={"associationName"}
                nameFR={"Nom de l'association"}
                required={true}
                stateName={associationName}
                onChange={(e) => setAssociationName(e.target.value)}
                validated={validated}
              />
              <TextInput
                nameEn={"objectAssociation"}
                nameFR={"Objet"}
                required={true}
                stateName={objectAssociation}
                onChange={(e) => setObjectAssociation(e.target.value)}
                validated={validated}
              />
              <TextInput
                nameEn={"headOffice"}
                nameFR={"Siége Social"}
                required={true}
                stateName={headOffice}
                onChange={(e) => setHeadOffice(e.target.value)}
                validated={validated}
              />
              <TextInput
                nameEn={"rnaNumber"}
                nameFR={"Numéro RNA"}
                required={true}
                stateName={rnaNumber}
                onChange={(e) => setRnaNumber(e.target.value)}
                validated={validated}
              />
              <FileInput
                nameEn={"joafePublication"}
                nameFR={"Justificatifs de publication au Joafe"}
                required={true}
                stateName={joafePublication}
                validated={validated}
                onChange={(e) => {
                  if (e.target.files[0].type === "application/pdf") {
                    setJoafePublication(e.target.files[0]);
                    // setJoafePublication(fileUrl(e));
                  } else {
                    setJoafePublication("invalid");
                  }
                }}
              />
              <YesNoRadioInput
                nameEn={"publicUtility"}
                nameFR={"Votre association est-elle reconnue d'utilité publique ?"}
                required={true}
                stateName={publicUtility}
                onChange={(e) => {
                  if (e.target.value === "yes") {
                    setPublicUtility(true);
                  } else {
                    setPublicUtility(false);
                  }
                }}
                validated={validated}
                yesId={"publicUtilityesYes"}
                noId={"publicUtilityNo"}
              />
              {publicUtility && (
                <FileInput
                  nameEn={"publicUtilityNotification"}
                  nameFR={"Notification d'utilité publique"}
                  required={false}
                  stateName={publicUtilityNotification}
                  validated={validated}
                  onChange={(e) => {
                    if (e.target.files[0].type === "application/pdf") {
                      setPublicUtilityNotification(e.target.files[0]);
                    }
                  }}
                />
              )}
              <YesNoRadioInput
                nameEn={"approvale"}
                nameFR={"Beneficier vous d'un agrément ?"}
                required={true}
                stateName={approvale}
                onChange={(e) => {
                  if (e.target.value === "yes") {
                    setApprovale(true);
                  } else {
                    setApprovale(false);
                  }
                }}
                validated={validated}
                yesId={"approvaleYes"}
                noId={"approvaleNo"}
              />
              {approvale && (
                <FileInput
                  nameEn={"approvaleCertificate"}
                  nameFR={"Attestation d'agrément"}
                  required={false}
                  stateName={approvaleCertificate}
                  validated={validated}
                  onChange={(e) => {
                    if (e.target.files[0].type === "application/pdf") {
                      setApprovaleCertificate(e.target.files[0]);
                    }
                  }}
                />
              )}
              <YesNoRadioInput
                nameEn={"needInsurance"}
                nameFR={
                  "Votre associalation necessite t'elle une assurance pour pratiquer la nature de votre activiter ?"
                }
                required={true}
                stateName={needInsurance}
                onChange={(e) => {
                  if (e.target.value === "yes") {
                    setNeedInsurance(true);
                  } else {
                    setNeedInsurance(false);
                  }
                }}
                validated={validated}
                yesId={"needInsuranceYes"}
                noId={"needInsuranceNo"}
              />
              {needInsurance && (
                <FileInput
                  nameEn={"insuranceCopy"}
                  nameFR={"Copie de votre assurance"}
                  required={false}
                  stateName={insuranceCopy}
                  validated={validated}
                  onChange={(e) => {
                    if (e.target.files[0].type === "application/pdf") {
                      setInsuranceCopy(e.target.files[0]);
                    }
                  }}
                />
              )}
              <YesNoRadioInput
                nameEn={"sirene"}
                nameFR={
                  'Votre association est-elle immatriculé au repertoire des entreprises et des etablissement "Sirene" ?'
                }
                required={true}
                stateName={sirene}
                onChange={(e) => {
                  if (e.target.value === "yes") {
                    setSirene(true);
                  } else {
                    setSirene(false);
                  }
                }}
                validated={validated}
                yesId={"sireneYes"}
                noId={"sireneNo"}
              />
              {sirene && (
                <TextInput
                  nameEn={"sireneNumber"}
                  nameFR={"Numero Sirene"}
                  required={false}
                  stateName={sireneNumber}
                  onChange={(e) => setSireneNumber(e.target.value)}
                  validated={validated}
                />
              )}
              <YesNoRadioInput
                nameEn={"alsaceMoselleLaw"}
                nameFR={"Votre assciation releve t'elle du droit local d'Alsace-Moselle ?"}
                required={true}
                stateName={alsaceMoselleLaw}
                onChange={(e) => {
                  if (e.target.value === "yes") {
                    setAlsaceMoselleLaw(true);
                  } else {
                    setAlsaceMoselleLaw(false);
                  }
                }}
                validated={validated}
                yesId={"alsaceMoselleLawYes"}
                noId={"alsaceMoselleLawYesNo"}
              />
            </fieldset>
            <fieldset>
              <legend>Information Complémenatire</legend>
              <PasswordInput
                nameEn={"password"}
                nameFR={"Mot de passe"}
                required={true}
                stateName={password}
                onChange={handleChangePassword}
                validated={validated}
                invalid={invalidPassword}
              />
              <p className="info">
                Votre mot de passe doit comporter 8 caractères minimum, 1 majuscule, 1 minuscule, 1
                chiffre et 1 caractère spécial.
              </p>
              <PasswordInput
                nameEn={"confirmPassword"}
                nameFR={"Confirmation du mot de passe"}
                required={true}
                stateName={confirmPassword}
                onChange={comparePassword}
                validated={validated}
                invalid={noMatchPassword}
              />

              {((!validated && confirmPassword === "") || noMatchPassword) && (
                <p className="error">Les mots de passes sont différents</p>
              )}

              <CheckboxInput
                nameEn={"cgu"}
                nameFR={"J'accepte les conditions d'utilisation"}
                required={true}
                stateName={cgu}
                onChange={(e) => {
                  setCgu(!cgu);
                }}
                validated={validated}
              />
              {!cgu && !validated && <p className="error">Requis</p>}
            </fieldset>
            {!validated && (
              <p className={"isInvalid"}>Les champs en rouges doivent etres remplis et valide</p>
            )}
            {dataExist && (
              <p className={"isInvalid"}>
                Certaine donnée unique sont déjà enregistrés chez nous, essayez de vous
                <span>
                  <Link href="/identification">
                    <a> connecter</a>
                  </Link>
                </span>
              </p>
            )}
            <div className={styles.btn}>
              <ButtonCustom name={"Inscription"} type={"submit"} />
            </div>
          </form>
        </div>
      )}
    </PageContainer>
  );
}

export default Inscription;
