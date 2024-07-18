import React, { useState } from 'react';
import './style.css';

const ButtonMistake: React.FC = () => {
  const [buttonValue, setButtonValue] = useState('Mistake');

  const handleError = (): void => {
    setButtonValue('error');
    throw new Error('Ok, ErrorBoundary works well :-)');
  };

  return (
    <button onClick={handleError} className="mistake-button">
      {buttonValue}
    </button>
  );
};

export default ButtonMistake;
