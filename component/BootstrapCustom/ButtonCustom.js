import Button from 'react-bootstrap/Button';

export default function ButtonCustom({ name, type }) {
  return (
    <>
      <style type='text/css'>
        {`
    .btn-flat {
      background-color: #275DAD;
      color: white;
    }
    `}
      </style>

      <Button variant='flat' type={type}>
        {name}
      </Button>
    </>
  );
}
