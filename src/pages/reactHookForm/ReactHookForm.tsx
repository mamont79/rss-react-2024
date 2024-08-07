import { Link } from 'react-router-dom';

export const ReactHookForm = () => {
  return (
    <>
      <header>
        <Link to={'/'}>Main page</Link>
        <Link to={'/uncontrolled'}>Uncontrolled form</Link>
      </header>
      <div>React</div>
      <div>Hook</div>
      <div>Form</div>
    </>
  );
};
