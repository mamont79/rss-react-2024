import { useSelector } from 'react-redux';
import { Header } from '../../components/header/header';
import './style.css';
import { RootState } from '../../store/store';
import { DataLink } from './DataLink';

export const MainPage = () => {
  const { data } = useSelector((state: RootState) => state.user);
  console.log(data);

  return (
    <>
      <Header />
      <h1 className="title">USERS DATA:</h1>
      {data[0].name ? (
        <div className="user-data">
          <DataLink
            title="Name:"
            dataValue={data[0].name}
            prevDataValue={data[1].name}
          />
          <DataLink
            title="Age:"
            dataValue={data[0].age}
            prevDataValue={data[1].age}
          />
          <DataLink
            title="Email:"
            dataValue={data[0].email}
            prevDataValue={data[1].email}
          />
          <DataLink
            title="Password:"
            dataValue={data[0].password}
            prevDataValue={data[1].password}
          />
          <DataLink
            title="Gender:"
            dataValue={data[0].gender}
            prevDataValue={data[1].gender}
          />
          <DataLink
            title="Accept Terms and Conditions:"
            dataValue={data[0].acceptTC}
            prevDataValue={data[1].acceptTC}
          />
        </div>
      ) : (
        <div>There is nothing to see... Please fill one of two forms</div>
      )}
    </>
  );
};
