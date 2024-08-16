import { useSelector } from 'react-redux';
import { Header } from '../../components/header/header';
import './style.css';
import { RootState } from '../../store/store';
import { DataLink } from './DataLink';

type UserInfoType = {
  title: string;
  dataValue: string;
  prevDataValue: string;
};

export const MainPage = () => {
  const { data } = useSelector((state: RootState) => state.user);

  const check = data.length > 1;
  const userInfo = !check
    ? ''
    : [
        {
          title: 'Name:',
          dataValue: data[0].name,
          prevDataValue: data[1].name,
        },
        { title: 'Age:', dataValue: data[0].age, prevDataValue: data[1].age },
        {
          title: 'Email:',
          dataValue: data[0].email,
          prevDataValue: data[1].email,
        },
        {
          title: 'Password:',
          dataValue: data[0].password,
          prevDataValue: data[1].password,
        },
        {
          title: 'Gender:',
          dataValue: data[0].gender,
          prevDataValue: data[1].gender,
        },
        {
          title: 'Country:',
          dataValue: data[0].country,
          prevDataValue: data[1].country,
        },
        {
          title: 'Accept Terms and Conditions:',
          dataValue: data[0].acceptTC,
          prevDataValue: data[1].acceptTC,
        },
        {
          title: 'File name:',
          dataValue: data[0].pictureName,
          prevDataValue: data[1].pictureName,
        },
      ];

  return (
    <>
      <Header />
      <h1 className="title">USERS DATA:</h1>
      {check ? (
        (userInfo as UserInfoType[]).map(
          ({ title, dataValue, prevDataValue }) => (
            <div className="user-data" key={title}>
              <DataLink
                title={title}
                dataValue={dataValue}
                prevDataValue={prevDataValue}
              />
            </div>
          )
        )
      ) : (
        <div>There is nothing to see... Please fill one of two forms</div>
      )}
    </>
  );
};
