import React, { useState } from 'react';
import ButtonCustom from 'component/BootstrapCustom/ButtonCustom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PageContainer from 'component/PageContainer/PageContainer';
import Login from 'component/Login/Login';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function connexion() {

  return (
    <PageContainer>        
      <div className='container  d-flex flex-wrap'>

        <div md="12" className='col-lg-6 col-'>
          <Login />
        </div>

        <div className='w-50 d-flex justify-content-center align-items-center'>
          <h2 className='text-center'>S'inscrire</h2>
          <div className="row w-100 ">
            <Container>
              <Row>
                <Col s md="8" lg="5" xl="4" className='m-auto'>
                  <ButtonCustom
                    className={'w-100 mt-5 mb-5'}
                    type='button'
                    name={'Créer un compte Bénévole'}
                    href={'/benevole/inscription'}
                  />
                </Col>
              </Row>
              <Row>
                <Col s md="8" lg="5" xl="4" className='m-auto'>
                  <ButtonCustom
                    className={'w-100 mt-5'}
                    type='button'
                    name={'Créer un compte Association'}
                    href={'/association/inscription'}
                  />
                </Col>
              </Row>
            </Container>
          </div>
          {/* <ButtonCustom
          type='button'
          name={"S'inscrire"}
          href={'/inscription'}
        /> */}
        </div>      
      </div>

    </PageContainer>
  );
}
