import { Link } from 'react-router-dom';
import { Header } from '../../components/header/header';
import BoySearchingSvg from '../../assets/searchingBoy';
import './style.css';

export const NotFoundPage = () => {
  return (
    <>
      <Header />
      <div className="not-found-wrapper">
        <h1 className="not-found-text">This page not found</h1>
        <Link to={'/'}>
          <BoySearchingSvg />
        </Link>
        <h2 className="not-found-text">Click the boy to go to Main page</h2>
      </div>
    </>
  );
};
