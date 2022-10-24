import ButtonCustom from 'component/BootstrapCustom/ButtonCustom';
import PageContainer from 'component/PageContainer/PageContainer';
import Inscription from 'pages/association/inscription';
import React, { useState } from 'react';
import styles from "../../styles/Register.module.scss"


function resetInscription() {

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validPassword, setInvalidPassword] = useState(false)
  const [matchPassword, setMatchPassword] = useState(false)
  const [birthday, setBirthday] = useState('');
  const [validBirthday, setInvalidBirthday] = useState(false)
  const [cgu, setCgu] = useState(false);
  const [invalidCgu, setInvalidCgu] = useState(false)

  const [validated, setValidated] = useState();

  const handleChangeLastName = (e) => {
    setLastName(e.target.value)
  }

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value)
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const checkBirthday = (e) => {
    const diff = new Date(Date.now() - new Date(e.target.value).getTime());
    const age = Math.abs(diff.getUTCFullYear() - 1970);
    console.log('file: inscription.js -> line 32 -> age', age);
    if (age < 16) {
      setInvalidBirthday(true)
      setValidated(false)
    } else if (age >= 16) {
      setInvalidBirthday(false)
    }
    setBirthday(e.target.value)
  }


  const handleChangeCgu = (e) => {
    setCgu(!cgu)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget;
    if (validated === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <PageContainer>
      <div className={styles.register}>
        <div>
          <h2>Inscription</h2>
          <h3>Bénévoles</h3>
        </div>

        <form noValidate validated={validated} onSubmit={handleSubmit}>
          <label>Nom</label>
          <input required type='text' placeholder='Nom' defaultValue={lastName} onChange={handleChangeLastName} />

          <label>Prénom</label>
          <input required type='text' placeholder='Prénom' defaultValue={firstName} onChange={handleChangeFirstName} />

          <label>Date de naissance</label>
          <input required type='date' defaultValue={birthday} onBlur={checkBirthday}
          />
          <p className={styles.info}
          // className='text-muted fw-lighter fst-italic'
          >
            Pour vous inscrire vous devez avoir 16 ans ou plus
          </p>
          {!validBirthday && <p className={styles.error}>
            Désolé vous êtes trops jeune 😔
          </p>}

          <label>Mot de passe</label>
          <input required type='password' placeholder='Mot de passe' defaultValue={password} />
          <p className={styles.info}
          // className='text-muted fw-lighter fst-italic'
          >
            Votre mot de passe doit comporter 8 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.
          </p>
          {/* <p type='invalid'>
          Entrer un mot de passe valide
        </p> */}

          <label>Confirmation du mot de passe</label>
          <input required type='password' placeholder='Mot de passe' defaultValue={password} />
          {/* <p type='invalid'>
            Entrer un mot de passe valide
          </p> */}
          <input
            required
            name='terms'
            label="J'accepte les conditions d'utilisation"
            onChange={handleChangeCgu}
            defaultValue={cgu}
            // feedback={errors.terms}
            feedbackType='invalid'
            id='validationFormik0'
          />
          <div
          // className='d-flex justify-content-center'
          >
            <ButtonCustom
              // className="d-flex justify-content-center"
              name={'Inscription'} type={'submit'} />
          </div>
        </form>
      </div>
    </PageContainer >
  );
}

export default Titi