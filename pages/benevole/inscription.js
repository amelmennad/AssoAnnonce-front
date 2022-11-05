import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import ButtonCustom from "component/Button/Button";
import PageContainer from "component/PageContainer/PageContainer";
import TextInput from "component/Input/TextInput";
import PasswordInput from "component/Input/PasswordInput";
import EmailInput from "component/Input/EmailInput";
import Loading from "component/Loading/Loading";

import styles from "../../styles/Inscription.module.scss";
import CheckboxInput from "component/Input/CheckboxInput";
import DateInput from "component/Input/DateInput";

function Inscription() {
  const router = useRouter();

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [invalidBirthday, setInvalidBirthday] = useState(false);
  const [email, setEmail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("file: inscription.js -> line 23 -> password", password);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [noMatchPassword, setNoMatchPassword] = useState(false);
  const [cgu, setCgu] = useState(false);

  const [validated, setValidated] = useState(true);
  const [dataExist, setDataExist] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const checkBirthday = (e) => {
    const diff = new Date(Date.now() - new Date(e.target.value).getTime());
    const age = Math.abs(diff.getUTCFullYear() - 1970);
    if (age < 16) {
      setInvalidBirthday(true);
    } else if (age >= 16) {
      setInvalidBirthday(false);
    }
    setBirthday(e.target.value);
  };

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

  const handleChangeCgu = (e) => {
    setCgu(!cgu);
  };

  const sendDate = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/volunteer/register`,
        data
      );
      setIsLoading(true);
      setData(response.data);
      if (data) {
        router.push("/benevole/profil");
      }
    } catch (error) {
      setDataExist(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !lastName ||
      !firstName ||
      !birthday ||
      invalidBirthday ||
      !email ||
      invalidEmail ||
      !password ||
      invalidPassword ||
      !confirmPassword ||
      noMatchPassword ||
      !cgu
    ) {
      setValidated(false);
      e.preventDefault();
      e.stopPropagation();
    } else {
      console.log("toto");
      const newVolunteer = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        birthday: birthday,
      };
      const response = sendDate(newVolunteer);
      console.log("file: resetInscription.js -> line 116 -> response", response);
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
            <h3>Bénévoles</h3>
          </div>

          <form onSubmit={handleSubmit}>
            {!validated && (
              <p className="isInvalid">Les champs en rouges doivent etres remplis et valide</p>
            )}
            {dataExist && (
              <p className={"isInvalid"}>
                Inscription impossible essayez de vous
                <span>
                  <Link href="/identification">
                    <a> connecter</a>
                  </Link>
                </span>
              </p>
            )}
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
            <DateInput
              nameEn={"birthday"}
              nameFR={"Date de naissance"}
              required={true}
              stateName={birthday}
              onBlur={checkBirthday}
              validated={validated}
              invalid={invalidBirthday}
            />
            <p className="info">Pour vous inscrire vous devez avoir 16 ans ou plus</p>
            {(!validated && birthday === "") ||
              (invalidBirthday && <p className="error">Désolé vous êtes trops jeune 😔</p>)}
            <EmailInput
              nameEn={"email"}
              nameFR={"Adresse e-mail"}
              required={true}
              stateName={email}
              onChange={handleChangeEmail}
              validated={validated}
              invalid={invalidEmail}
            />
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
            {((!validated && password === "") || invalidPassword) && (
              <p className="error">Entrer un mot de passe valide</p>
            )}
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
            {!cgu && !validated && (
              <p className="error">Obligatoire pour valider l&apos;inscription</p>
            )}
            <div className="btn">
              <ButtonCustom name={"Inscription"} type={"submit"} />
            </div>
          </form>
        </div>
      )}
    </PageContainer>
  );
}

export default Inscription;
