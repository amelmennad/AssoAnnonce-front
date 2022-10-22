import ButtonCustom from 'component/BootstrapCustom/ButtonCustom';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function inscription() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className='container mt-5'>
      <div className='card'>
        <div className='card-header text-center'>Bénévoles</div>
        <div className='card-body'>
          <h5 className='card-title text-center'>Inscription</h5>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className='mb-3 fw-semibold' controlId='lastName'>
              <Form.Label>Nom</Form.Label>
              <Form.Control required type='text' />
            </Form.Group>
            <Form.Group className='mb-3 fw-semibold' controlId='firstName'>
              <Form.Label>Prénom</Form.Label>
              <Form.Control required type='text' placeholder='Prénom' />
            </Form.Group>
            <Form.Group className='mb-3 fw-semibold' controlId='birthday'>
              <Form.Label>Date de naissance</Form.Label>
              <Form.Control required type='date' />
              <Form.Text className='text-muted fw-lighter fst-italic'>
                Pour vous inscrire vous devez avoir 16 ans ou plus
              </Form.Text>
            </Form.Group>

            <Form.Group
              className='mb-3 fw-semibold'
              controlId='formBasicPassword'
            >
              <Form.Label>Password</Form.Label>
              <Form.Control required type='password' placeholder='Password' />
              <Form.Text className='text-muted fw-lighter fst-italic'>
                Votre mot de passe doit comporter entre 8 et 20 caractères,
                contenir des lettres et des chiffres et ne doit pas contenir
                d'espaces, de caractères spéciaux ou d'emoji.
              </Form.Text>
              <Form.Control.Feedback type='invalid'>
                Entrer un mot de passe valide
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Check
                required
                name='terms'
                label='Agree to terms and conditions'
                // onChange={handleChange}
                // isInvalid={!!errors.terms}
                // feedback={errors.terms}
                feedbackType='invalid'
                id='validationFormik0'
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
            <ButtonCustom name={'Inscription'} type={'submit'} />
          </Form>
        </div>
        {/* </div> */}
      </div>
    </div>
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
