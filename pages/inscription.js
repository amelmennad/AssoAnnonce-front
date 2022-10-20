import ButtonCustom from 'component/BootstrapCustom/ButtonCustom';
import Link from 'next/link';

export default function Contact() {
  return (
    <section className='section container d-flex flex-column' id='contact'>
      <h2 className='text-center'>S'inscrire</h2>

      <ButtonCustom
        type='button'
        name={'Créer un compte benevole'}
        href={'/benevole/inscription'}
      />
      <ButtonCustom
        type='button'
        name={'Créer un compte Association'}
        href={'/association/inscription'}
      />
    </section>
  );
}
