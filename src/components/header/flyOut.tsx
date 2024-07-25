import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './style.css';
import { resetAll } from '../../store/pokemons/selectedSlice';
import { convertToCSV } from './converToCsv';

export const FlyOut = () => {
  const { amount, selectedData } = useSelector(
    (state: RootState) => state.selected
  );
  const dispatch = useDispatch();

  const unselectAll = () => {
    dispatch(resetAll());
  };

  const handleDownload = () => {
    const csvContent = convertToCSV(selectedData);
    const fileName = `${amount}_pokemons.csv`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flyout">
      <div className="flyout-count">Selected: {amount}</div>
      <button className="flyout-button" onClick={unselectAll}>
        Unselect All
      </button>
      <button className="flyout-button" onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};
