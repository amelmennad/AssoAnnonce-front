import ButtonCustom from "component/BootstrapCustom/ButtonCustom";
import PageContainer from "component/PageContainer/PageContainer";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../styles/Register.module.scss";

function Inscription() {
  const router = useRouter();

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [invalidBirthday, setInvalidBirthday] = useState(false);
  const [email, setEmail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState(false);

  const [cgu, setCgu] = useState(false);

  const [validated, setValidated] = useState(true);

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

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
    if (password === e.target.value) {
      setMatchPassword(true);
    }
  };

  const handleChangeCgu = (e) => {
    setCgu(!cgu);
  };

  const sendDate = async (data) => {
    try {
      const response = await axios.post(`http://localhost:3100/api/volunteer/register`, data);
      console.log("file: inscription.js -> line 82 -> response", response.data);
    } catch (error) {
      console.log("file: inscription.js -> line 87 -> error", error);
      console.log("file: inscription.js -> line 87 -> error", error.response.data);
    }
    // router.push("/");
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
      !matchPassword ||
      !cgu
    ) {
      setValidated(false);
      e.preventDefault();
      e.stopPropagation();
    } else {
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
      <div className={styles.register}>
        <div>
          <h2>Inscription</h2>
          <h3>Bénévoles</h3>
        </div>

        <form noValidate onSubmit={handleSubmit}>
          {!validated && (
            <p className={styles.isInvalid}>Les champs en rouges doivent etres remplis et valide</p>
          )}
          <label>Nom</label>
          <input
            required={false}
            type="text"
            placeholder="Nom"
            defaultValue={lastName}
            onChange={handleChangeLastName}
            className={
              !validated && lastName === "" ? styles.isInvalid : lastName ? styles.isValid : ""
            }
          />

          <label>Prénom</label>
          <input
            required
            type="text"
            placeholder="Prénom"
            defaultValue={firstName}
            onChange={handleChangeFirstName}
            className={
              !validated && firstName === "" ? styles.isInvalid : firstName ? styles.isValid : ""
            }
          />

          <label>Date de naissance</label>
          <input
            required
            type="date"
            defaultValue={birthday}
            onBlur={checkBirthday}
            className={
              (!validated && birthday === "") || invalidBirthday
                ? styles.isInvalid
                : birthday && !invalidBirthday
                ? styles.isValid
                : ""
            }
          />
          <p className={styles.info}>Pour vous inscrire vous devez avoir 16 ans ou plus</p>
          {(!validated && birthday === "") ||
            (invalidBirthday && <p className={styles.error}>Désolé vous êtes trops jeune 😔</p>)}

          <label>Email</label>
          <input
            required
            type="Adresse mail"
            placeholder="Adresse mail"
            defaultValue={email}
            onChange={handleChangeEmail}
            className={
              (!validated && email === "") || invalidEmail
                ? styles.isInvalid
                : email && !invalidEmail
                ? styles.isValid
                : ""
            }
          />

          <label>Mot de passe</label>
          <input
            required
            type="text"
            placeholder="Mot de passe"
            defaultValue={password}
            onChange={handleChangePassword}
            className={
              (!validated && password === "") || invalidPassword
                ? styles.isInvalid
                : password && !invalidPassword
                ? styles.isValid
                : ""
            }
          />
          <p className={styles.info}>
            Votre mot de passe doit comporter 8 caractères minimum, 1 majuscule, 1 minuscule, 1
            chiffre et 1 caractère spécial.
          </p>
          {((!validated && password === "") || invalidPassword) && (
            <p className={styles.error}>Entrer un mot de passe valide</p>
          )}

          <label>Confirmation du mot de passe</label>
          <input
            required
            type="text"
            placeholder="Mot de passe"
            defaultValue={confirmPassword}
            onChange={comparePassword}
            className={
              (!validated && confirmPassword === "") || (confirmPassword !== "" && !matchPassword)
                ? styles.isInvalid
                : confirmPassword && matchPassword
                ? styles.isValid
                : ""
            }
          />
          {((!matchPassword && confirmPassword !== "") || (!matchPassword && !validated)) && (
            <p className={styles.error}>Les mots de passes sont différents</p>
          )}

          <div className={styles.cgu}>
            <input type="checkbox" required onChange={handleChangeCgu} defaultValue={cgu} />
            <label className="">J'accepte les conditions d'utilisation</label>
            {!cgu && !validated && (
              <p className={styles.error}>Obligatoire pour valider l'inscription</p>
            )}
          </div>
          <div>
            <ButtonCustom name={"Inscription"} type={"submit"} />
          </div>
        </form>
      </div>
    </PageContainer>
  );
}

export default Inscription;
