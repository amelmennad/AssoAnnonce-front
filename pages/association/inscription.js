import React from 'react';

export default function Inscription() {
  async function handleSubmit() {
    //   const response = await fetch(
    //     'http://localhost:3100/api/volunteer/register',
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         firstName: 'testcommit',
    //         lastName: 'testcommit',
    //         email: 'fuhiezfhuiezhiuf@tintin.com',
    //         password: 'Azerty1.',
    //         birthday: '2001-06-01',
    //       }),
    //     }
    //   );
    //   console.log('file: index.js -> line 33 -> response', response);
    //   const data = await response.json();
    //   console.log('file: index.js -> line 33 -> data', data);
    //   if (!data.hasOwnProperty(data.id)) {
    //     return {
    //       props: {
    //         data,
    //       },
    //     };
    //   } else {
    //     return {
    //       data: {
    //         id: data.id,
    //         token: data.token,
    //       },
    //     };
    //   }
  }

  return (
    <div>
      <h2>Inscription Association</h2>

      <form action='' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' id='name' />
        <input type='submit' value="S'inscrire" />
      </form>
    </div>
  );
}
