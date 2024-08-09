import { useSelector } from 'react-redux';
import { Header } from '../../components/header/header';
import './style.css';
import { RootState } from '../../store/store';

export const MainPage = () => {
  const { name, age, email, password, gender, acceptTC } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <>
      <Header />
      <h1>USERS DATA:</h1>
      {name ? (
        <div className="user-data">
          <p className="string-wrapper">
            <span className="user-left">Name:</span>
            {' : '}
            <span className="user-right">{name}</span>
          </p>
          <p className="string-wrapper">
            <span className="user-left">Age:</span>
            {' : '}
            <span className="user-right">{age}</span>
          </p>
          <p className="string-wrapper">
            <span className="user-left">Email:</span>
            {' : '}
            <span className="user-right">{email}</span>
          </p>
          <p className="string-wrapper">
            <span className="user-left">Password:</span>
            {' : '}
            <span className="user-right">{password}</span>
          </p>
          <p className="string-wrapper">
            <span className="user-left">Gender:</span>
            {' : '}
            <span className="user-right">{gender}</span>
          </p>
          <p className="string-wrapper">
            <span className="user-left">Accept Terms and Conditions:</span>
            {' : '}
            <span className="user-right">{acceptTC}</span>
          </p>
        </div>
      ) : (
        <div>There is nothing to see... Please fill one of two forms</div>
      )}
    </>
  );
};
