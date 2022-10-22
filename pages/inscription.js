import ButtonCustom from 'component/BootstrapCustom/ButtonCustom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PageContainer from 'component/PageContainer/PageContainer';

export default function Contact() {
  return (
    <PageContainer>
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
    </PageContainer>
  );
}
