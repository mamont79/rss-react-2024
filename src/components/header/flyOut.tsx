import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './style.css';
import { resetAll } from '../../store/pokemons/selectedSlice';

export const FlyOut = () => {
  const { amount } = useSelector((state: RootState) => state.selected);
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
      <button className="flyout-button">Download</button>
    </div>
  );
};
