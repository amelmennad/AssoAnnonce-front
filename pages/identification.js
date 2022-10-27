import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import PageContainer from "component/PageContainer/PageContainer";
import ButtonCustom from "component/BootstrapCustom/ButtonCustom";

import styles from "../styles/Identification.module.scss";

export default function connexion() {
  const [email, setEmail] = useState("s@s.ss");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [password, setPassword] = useState("Azerty1.");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [validated, setValidated] = useState(true);
  const [user, setUser] = useState();

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
  const searchUser = async (data) => {
    try {
      const responseVolunteer = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/volunteer/login`,
        data
      );
      setUser(responseVolunteer.data);
      console.log("file: identification.js -> line 16 -> user", user);
      router.push("/benevole/profil");
    } catch (error) {
      try {
        const responseAssociation = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/api/association/login`,
          data
        );
        setUser(responseAssociation.data);
        console.log("file: identification.js -> line 16 -> user", user);
        router.push("/association/profil");
      } catch (error) {
        console.log("not association");
      }
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const datata = {
      email: "tintin@ti.como",
      password: "Test32asso.",
    };

    if (!email || invalidEmail || !password || invalidPassword) {
      setValidated(false);
      e.preventDefault();
      e.stopPropagation();
    } else {
      const loginData = {
        email: email,
        password: password,
      };
      searchUser(datata);
    }
  };
  return (
    <PageContainer>
      <div className={styles.identification}>
        <div className={styles.login}>
          <h2>Connexion</h2>
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor="email">Adresse e-mail</label>
            <input
              id="email"
              required
              type="Adresse mail"
              placeholder="Adresse e-mail"
              defaultValue={email}
              onChange={handleChangeEmail}
              className={
                (!validated && email === "") || invalidEmail
                  ? "isInvalid"
                  : email && !invalidEmail
                  ? "isValid"
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
                  ? "isInvalid"
                  : password && !invalidPassword
                  ? "isValid"
                  : ""
              }
            />

            {((!validated && password === "") || invalidPassword) && (
              <>
                <p className="error">Entrer un mot de passe valide</p>
                <p className="info">
                  Votre mot de passe doit comporter 8 caractères minimum, 1 majuscule, 1 minuscule,
                  1 chiffre et 1 caractère spécial.
                </p>
              </>
            )}
            <div className={styles.button}>
              <ButtonCustom
                type="submit"
                name={"Connexion"}
                // href={"/association/inscription"}
              />
            </div>
          </form>
        </div>
        <div className={styles.register}>
          <h2>S'inscrire</h2>

          <ButtonCustom
            type="button"
            name={"Créer un compte Bénévole"}
            href={"/benevole/inscription"}
          />
          <ButtonCustom
            type="button"
            name={"Créer un compte Association"}
            href={"/association/inscription"}
          />
        </div>
        {/* <ButtonCustom
          type='button'
          name={"S'inscrire"}
          href={'/inscription'}
        /> */}
      </div>
    </PageContainer>
  );
}
