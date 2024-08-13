import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

type DataLinkProps = {
  title: string;
  dataValue: string | number | boolean | null;
  prevDataValue: string | number | boolean | null;
};

export const DataLink = ({
  title,
  dataValue,
  prevDataValue,
}: DataLinkProps) => {
  const [newer, setNewer] = useState(false);
  const { date } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const time = new Date().getTime() - date;
    if (time < 5000) {
      if (dataValue !== prevDataValue) {
        setNewer(true);
      }
      setTimeout(() => {
        setNewer(false);
      }, 5000);
    }
  }, [dataValue, date, prevDataValue]);

  return (
    <p className="string-wrapper">
      <span className="user-left">{title}</span>
      {' : '}
      <span className={newer ? 'user-right-new' : 'user-right'}>
        {dataValue}
      </span>
    </p>
  );
};
