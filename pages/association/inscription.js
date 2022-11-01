import ButtonCustom from "component/Button/Button";
import PageContainer from "component/PageContainer/PageContainer";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../styles/Register.module.scss";
import TextInput from "component/Input/textInput";
import FileInput from "component/Input/FileInput";
import YesNoRadioInput from "component/Input/yesNoRadioInput";
import PasswordInput from "component/Input/PasswordInput";
import EmailInput from "component/Input/EmailInput";

function Inscription() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [powerDelegation, setPowerDelegation] = useState("");
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

  const sendDate = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/association/register`,
        data
      );
      console.log("file: inscription.js -> line 88 -> response", response);
      // router.push("/");
    } catch (error) {
      console.log("file: inscription.js -> line 87 -> error", error);
      console.log("file: inscription.js -> line 87 -> error", error.response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

      const newAssociation = {
        lastName,
        firstName,
        email,
        invalidEmail,
        address,
        powerDelegation,
        associationStatutes,
        interiorRules,
        secondaryEstablishment,
        associationName,
        objectAssociation,
        headOffice,
        rnaNumber,
        joafePublication,
        alsaceMoselleLaw,
        password,
        invalidPassword,
        confirmPassword,
        noMatchPassword,
        cgu,
      };
      console.log("file: inscription.js -> line 135 -> newAssociation", newAssociation);
      setValidated(false);
      e.stopPropagation();
    } else {
      const newAssociation = {
        lastName,
        firstName,
        email,
        // address,
        powerDelegation,
        associationStatutes,
        interiorRules,
        secondaryEstablishment,
        associationName,
        objectAssociation,
        headOffice,
        rnaNumber,
        joafePublication,
        alsaceMoselleLaw,
        password,
        invalidPassword,
        confirmPassword,
        noMatchPassword,
        cgu,
      };

      if (publicUtility && publicUtilityNotification) {
        newAssociation.publicUtility = publicUtility;
        newAssociation.publicUtilityNotification = publicUtilityNotification;
      } else {
        newAssociation.publicUtility = publicUtility;
      }
      if (approvale && approvaleCertificate) {
        newAssociation.approvale = approvale;
        newAssociation.approvaleCertificate = approvaleCertificate;
      } else {
        newAssociation.approvale = approvale;
      }
      if (needInsurance && insuranceCopy) {
        newAssociation.needInsurance = needInsurance;
        newAssociation.insuranceCopy = insuranceCopy;
      } else {
        newAssociation.needInsurance = needInsurance;
      }
      if (sirene && sireneNumber) {
        newAssociation.sirene = sirene;
        newAssociation.sireneNumber = sireneNumber;
      } else {
        newAssociation.sirene = sirene;
      }

      console.log("file: inscription.js -> line 123 -> newAssociation", newAssociation);

      const response = sendDate(newAssociation);
      console.log("file: resetInscription.js -> line 116 -> response", response);
    }
  };

  return (
    <PageContainer>
      <div className={styles.register}>
        <div>
          <h2>Inscription</h2>
          <h3>Association</h3>
        </div>

        <form noValidate onSubmit={handleSubmit}>
          {!validated && (
            <p className={"isInvalid"}>Les champs en rouges doivent etres remplis et valide</p>
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
                setPowerDelegation("");

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
                }
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Identité de l'association</legend>
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

            <div className={styles.cgu}>
              <input
                type="checkbox"
                required
                onChange={(e) => {
                  setCgu(!cgu);
                }}
                defaultValue={cgu}
              />
              <label>J'accepte les conditions d'utilisation</label>
              {!cgu && !validated && <p className="error">Requis</p>}
            </div>
          </fieldset>
          {!validated && (
            <p className={"isInvalid"}>Les champs en rouges doivent etres remplis et valide</p>
          )}
          <div>
            <ButtonCustom name={"Inscription"} type={"submit"} />
          </div>
        </form>
      </div>
    </PageContainer>
  );
}

export default Inscription;
