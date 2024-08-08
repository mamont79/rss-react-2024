import { Link } from 'react-router-dom';
import { Header } from '../../components/header/header';

export const NotFoundPage = () => {
  return (
    <>
      <Header />
      <div>This page</div>
      <div>404</div>
      <div>We can't find this</div>
      <Link to={'/'}>Wanna go back to Main page?</Link>
    </>
  );
};
