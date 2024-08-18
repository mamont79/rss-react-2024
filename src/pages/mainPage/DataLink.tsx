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

  let value = dataValue;
  let lastValue = prevDataValue;
  if (typeof dataValue === 'boolean') {
    value = dataValue === true ? 'accepted' : 'not accepted';
    lastValue = dataValue === true ? 'accepted' : 'not accepted';
  }

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
      <span className={newer ? 'user-right-new' : 'user-right'}>{value}</span>
      {' : '}
      <span className="user-prev">{lastValue}</span>
    </p>
  );
};
