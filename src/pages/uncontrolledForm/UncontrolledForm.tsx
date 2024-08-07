import { Link } from 'react-router-dom';

export const UncontrolledForm = () => {
  return (
    <>
      <header>
        <Link to={'/react-form'}>React form</Link>
        <Link to={'/'}>Main page</Link>
      </header>
      <div>Uncontrolled</div>
      <div>Form</div>
    </>
  );
};
