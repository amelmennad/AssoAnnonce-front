import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import styles from "../styles/Identification.module.scss";

import PageContainer from "component/PageContainer/PageContainer";
import EmailInput from "component/Input/EmailInput";
import PasswordInput from "component/Input/PasswordInput";
import Button from "../component/Button/Button";

export default function Identification() {
  const [email, setEmail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [password, setPassword] = useState("");
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
      router.push("/benevole/profil");
    } catch (error) {
      try {
        const responseAssociation = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/api/association/login`,
          data
        );
        setUser(responseAssociation.data);
        router.push("/association/profil");
      } catch (error) {
        setValidated(false);
      }
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!email || invalidEmail || !password || invalidPassword) {
      setValidated(false);
      e.preventDefault();
      e.stopPropagation();
    } else {
      searchUser({
        email: email,
        password: password,
      });
    }
  };
  return (
    <PageContainer>
      <div className={styles.identification}>
        <div className={styles.login}>
          <h2>Connexion</h2>
          <form onSubmit={handleLoginSubmit}>
            {!validated && !user ? (
              <p className="error"> Adresse e-mail ou mot de passe incorrect </p>
            ) : (
              ""
            )}
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
            <div className={`btn`}>
              <Button type="submit" name={"Connexion"} />
            </div>
          </form>
        </div>
        <div className={styles.register}>
          <h2>S&apos;inscrire</h2>

          <Button type="button" name={"Créer un compte Bénévole"} href={"/benevole/inscription"} />
          <Button
            type="button"
            name={"Créer un compte Association"}
            href={"/association/inscription"}
          />
        </div>
      </div>
    </PageContainer>
  );
}
