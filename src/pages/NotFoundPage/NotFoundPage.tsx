import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <>
      <div>This page</div>
      <div>404</div>
      <div>We can't find this</div>
      <Link to={'/'}>Wanna go back to Main page?</Link>
    </>
  );
};
