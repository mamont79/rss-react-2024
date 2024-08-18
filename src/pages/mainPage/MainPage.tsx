import { useSelector } from 'react-redux';
import { Header } from '../../components/header/header';
import './style.css';
import { RootState } from '../../store/store';
import { DataLink } from './DataLink';
import { useState } from 'react';

type UserInfoType = {
  title: string;
  dataValue: string;
  prevDataValue: string;
};

export const MainPage = () => {
  const { data } = useSelector((state: RootState) => state.user);
  const [formId, setFormId] = useState(0);

  const check = data.length > 1;
  const maxId = data.length - 3;

  const setNextId = () => {
    if (formId < maxId) setFormId(formId + 1);
  };
  const setPrevId = () => {
    if (formId > 0) setFormId(formId - 1);
  };

  const userInfo = !check
    ? ''
    : [
        {
          title: 'Name',
          dataValue: data[formId].name,
          prevDataValue: data[formId + 1].name,
        },
        {
          title: 'Age',
          dataValue: data[formId].age,
          prevDataValue: data[formId + 1].age,
        },
        {
          title: 'Email',
          dataValue: data[formId].email,
          prevDataValue: data[formId + 1].email,
        },
        {
          title: 'Password',
          dataValue: data[formId].password,
          prevDataValue: data[formId + 1].password,
        },
        {
          title: 'Gender',
          dataValue: data[formId].gender,
          prevDataValue: data[formId + 1].gender,
        },
        {
          title: 'Country',
          dataValue: data[formId].country,
          prevDataValue: data[formId + 1].country,
        },
        {
          title: 'Terms and Conditions',
          dataValue: data[formId].acceptTC,
          prevDataValue: data[formId + 1].acceptTC,
        },
        {
          title: 'File name',
          dataValue: data[formId].pictureName,
          prevDataValue: data[formId + 1].pictureName,
        },
      ];

  return (
    <>
      <Header />
      <h1 className="title">USERS DATA:</h1>
      {check && (
        <>
          <button
            className="button-page"
            onClick={setPrevId}
            disabled={formId === 0}
          >
            Newer Form
          </button>
          <button
            className="button-page"
            onClick={setNextId}
            disabled={formId === maxId}
          >
            Older Form
          </button>
          <div className="user-data">
            <DataLink
              title={''}
              dataValue={
                formId === 0 ? `Last form` : `Form was ${formId} times ago`
              }
              prevDataValue={`Form was ${formId + 1} times ago`}
            />
          </div>
        </>
      )}
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
