import React, { useState } from 'react';
import ButtonCustom from 'component/BootstrapCustom/ButtonCustom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PageContainer from 'component/PageContainer/PageContainer';

export default function connexion() {
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
    <PageContainer>
      <h2 className='text-center'>Se connecter</h2>
      <div className='w-50 d-flex container'>
        <div className='w-50 d-flex justify-content-center align-item-center '>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className='mb-3 fw-semibold' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control required type='email' placeholder='Enter email' />
              <Form.Control.Feedback type='invalid'>
                Entrer une adresse mail valide
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className='mb-3 fw-semibold'
              controlId='formBasicPassword'
            >
              <Form.Label>Password</Form.Label>
              <Form.Control required type='password' placeholder='Password' />
              <Form.Control.Feedback type='invalid'>
                Entrer un mot de passe valide
              </Form.Control.Feedback>
            </Form.Group>
            <div className='d-flex justify-content-center'>
              <ButtonCustom
                variant='primary'
                type='submit'
                name={'Se connecter'}
              >
                Submit
              </ButtonCustom>
            </div>
          </Form>
        </div>
        <div className='w-50 d-flex justify-content-center align-items-center'>
          <ButtonCustom
            type='button'
            name={"S'inscrire"}
            href={'/inscription'}
          />
        </div>
      </div>
    </PageContainer>
  );
}
