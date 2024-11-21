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

  return (
    <div className="flyout">
      <div className="flyout-count">Selected: {amount}</div>
      <button className="flyout-button" onClick={unselectAll}>
        Unselect All
      </button>
      <button className="flyout-button">
        <a
          className="flyout-link"
          href={convertToCSV(selectedData)}
          download={`${amount}_pokemons.csv`}
        >
          Download
        </a>
      </button>
    </div>
  );
};
