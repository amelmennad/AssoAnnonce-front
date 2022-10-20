import Button from 'react-bootstrap/Button';
import Link from 'next/link';
export default function ButtonCustom({ name, type, href }) {
  return (
    <>
      <style type='text/css'>
        {`
          .btn-flat {
            background-color: #FFF;
            border: solid 1px #275DAD;
            color: #275DAD;

          }
          .btn-flat:hover {
             background-color: #275DAD;
            color: white;

          }
        `}
      </style>
      {href ? (
        <Link href={href}>
          <Button variant='flat' type={type}>
            <a>{name}</a>
          </Button>
          {}
        </Link>
      ) : (
        <Button variant='flat' type={type}>
          {name}
        </Button>
      )}
    </>
  );
}
