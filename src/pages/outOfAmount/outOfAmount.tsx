import './style.css';
import { Link } from 'react-router-dom';

export const OutOfAmount = () => {
  return (
    <div className="out-wrapper">
      <div className="out-text">It's out of our possibility</div>
      <div className="out-text">Our pokemons are over</div>
      <div className="out-text">
        Last pokemons you can find at{' '}
        <Link to="/page/66" className="link">
          Page 66
        </Link>
      </div>
    </div>
  );
};
