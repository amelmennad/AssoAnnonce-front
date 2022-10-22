import ButtonCustom from 'component/BootstrapCustom/ButtonCustom';
import PageContainer from 'component/PageContainer/PageContainer';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function inscription() {

  // console.log('file: inscription.js -> line 11 -> Date.now()', Date.now());
  // const diff = new Date(Date.now() - new Date(birthday).getTime());
  // const age = Math.abs(diff.getUTCFullYear() - 1970);


  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidPassword, setInvalidPassword] = useState(false)
  const [matchPassword, setMatchPassword] = useState(false)
  const [birthday, setBirthday] = useState('');
  const [invalidBirthday, setInvalidBirthday] = useState(false)
  const [cgu, setCgu] = useState(false);
  const [invalidCgu, setInvalidCgu] = useState(false)

  const [validated, setValidated] = useState(false);

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
    } else if (age >= 16) {
      setInvalidBirthday(false)
    }
    setBirthday(e.target.value)
  }


  const handleChangeCgu = (e) => {
    setCgu(!cgu)
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <PageContainer>
      <div className='text-center '>
        <h4>Inscription</h4>
        <h6>Bénévoles</h6>
      </div>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className='mb-3 fw-semibold' controlId='lastName'>
          <Form.Label>Nom</Form.Label>
          <Form.Control required type='text' defaultValue={lastName} onChange={handleChangeLastName} />
        </Form.Group>
        <Form.Group className='mb-3 fw-semibold' controlId='firstName'>
          <Form.Label>Prénom</Form.Label>
          <Form.Control required type='text' placeholder='Prénom' defaultValue={firstName} onChange={handleChangeFirstName} />
        </Form.Group>
        <Form.Group className='mb-3 fw-semibold' controlId='birthday' >
          <Form.Label>Date de naissance</Form.Label>
          <Form.Control required type='date' defaultValue={birthday} onBlur={checkBirthday} isInvalid={invalidBirthday}
          />
          <Form.Text className='text-muted fw-lighter fst-italic'>
            Pour vous inscrire vous devez avoir 16 ans ou plus
          </Form.Text>
          {invalidBirthday && <Form.Control.Feedback type='invalid'>
            Désolé vous êtes trops jeune 😔
          </Form.Control.Feedback>}
        </Form.Group>

        <Form.Group
          className='mb-3 fw-semibold'
          controlId='formBasicPassword'
        >
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control required type='password' placeholder='Mot de passe' defaultValue={password} />
          <Form.Text className='text-muted fw-lighter fst-italic'>
            Votre mot de passe doit comporter 8 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.
          </Form.Text>
          <Form.Control.Feedback type='invalid'>
            Entrer un mot de passe valide
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          className='mb-3 fw-semibold'
          controlId='formBasicPassword'
        >
          <Form.Label>Confirmation du mot de passe</Form.Label>
          <Form.Control required type='password' placeholder='Mot de passe' defaultValue={password} />
          <Form.Control.Feedback type='invalid'>
            Entrer un mot de passe valide
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Check
            required
            name='terms'
            label="J'accepte les conditions d'utilisation"
            onChange={handleChangeCgu}
            defaultValue={cgu}
            isInvalid={invalidCgu}
            // feedback={errors.terms}
            feedbackType='invalid'
            id='validationFormik0'
          />
        </Form.Group>
        <div className='d-flex justify-content-center'>
          <ButtonCustom className="d-flex justify-content-center" name={'Inscription'} type={'submit'} />
        </div>
      </Form>

    </PageContainer>
  );
}
/*
<Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className='mb-3 fw-semibold' controlId='lastName'>
          <Form.Label>Nom</Form.Label>
          <Form.Control required type='text' placeholder='Nom' />
          <Form.Control.Feedback type='invalid'>
            Please choose a username.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3 fw-semibold' controlId='firstName'>
          <Form.Label>Prénom</Form.Label>
          <Form.Control required type='text' placeholder='Prénom' />
        </Form.Group>
        <Form.Group className='mb-3 fw-semibold' controlId='d'>
          <Form.Label>Password</Form.Label>
          <Form.Control required type='password' placeholder='Password' />
          <Form.Text className='text-muted'>
            Pour vous inscrire vous devez avoir 16 ans ou plus
          </Form.Text>
        </Form.Group>
        <Form.Group className='mb-3 fw-semibold' controlId='birthday'>
          <Form.Label>Date de naissance</Form.Label>
          <Form.Control required type='date' />
        </Form.Group>

        <Form.Group className='mb-3 fw-semibold' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control required type='password' placeholder='Password' />
          <Form.Text className='text-muted'>
            Votre mot de passe doit comporter entre 8 et 20 caractères, contenir
            des lettres et des chiffres et ne doit pas contenir d'espaces, de
            caractères spéciaux ou d'emoji.
          </Form.Text>
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>

*/

/*
   <form action='' onSubmit={handleSubmit}>
        <label htmlFor='firstName'>firstName</label>
        <input type='text' name='firstName' id='firstName' />
        <label htmlFor='lastName'>lastName</label>
        <input type='text' name='lastName' id='lastName' />
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' />
        <label htmlFor='birthday'>birthday</label>
        <input type='date' name='birthday' id='birthday' />
        <input type='submit' value="S'inscrire" />
      </form>
        /*
    const volunteerProfilData: IVolunteerProfilData = {
      firstName: req.volunteer.firstName,
      lastName: req.volunteer.lastName,
      email: req.volunteer.email,
      birthday: req.volunteer.birthday,
    };
     */
/*
    // const response = await fetch(
    //   'http://localhost:3100/api/volunteer/register',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       firstName: 'testcommit',
    //       lastName: 'testcommit',
    //       email: 'fuhiezfhuiezhiuf@tintin.com',
    //       password: 'Azerty1.',
    //       birthday: '2001-06-01',
    //     }),
    //   }
    // );

    // console.log('file: index.js -> line 33 -> response', response);

    // const data = await response.json();
    // console.log('file: index.js -> line 33 -> data', data);
    // if (!data.hasOwnProperty(data.id)) {
    //   return {
    //     props: {
    //       data,
    //     },
    //   };
    // } else {
    //   return {
    //     data: {
    //       id: data.id,
    //       token: data.token,
    //     },
    //   };
    // }*/
