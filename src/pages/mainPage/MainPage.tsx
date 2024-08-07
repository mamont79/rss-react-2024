import { Link } from 'react-router-dom';

export const MainPage = () => {
  return (
    <>
      <header>
        <Link to={'/react-form'}>React form</Link>
        <Link to={'/uncontrolled'}>Uncontrolled form</Link>
      </header>
      <div>Main</div>
      <div>Page</div>
    </>
  );
};
