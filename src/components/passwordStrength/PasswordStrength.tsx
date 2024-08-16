import { useCallback, useEffect, useState } from 'react';
import './style.css';

type PassCharsType = {
  nums: string[];
  lower: string[];
  upper: string[];
  spec: string[];
  length: number;
};

export const PasswordStrength = ({ password }: { password: string }) => {
  const [power, setPower] = useState(0);
  const [color, setColor] = useState('none');

  const parsePassword = useCallback((password: string) => {
    let result = 0;

    const passChars: PassCharsType = {
      nums: [],
      lower: [],
      upper: [],
      spec: [],
      length: 0,
    };

    for (let i = 0; i < password.length; i++) {
      if (password.length > 8) passChars.length = 1;
      if (/\d/.test(password[i])) passChars.nums.push(password[i]);
      if (/[a-z]/.test(password[i])) passChars.lower.push(password[i]);
      if (/[A-Z]/.test(password[i])) passChars.upper.push(password[i]);
      if (/[@$!%*?&_-]/.test(password[i])) passChars.spec.push(password[i]);
    }

    if (passChars.nums.length) result += 1;
    if (passChars.lower.length) result += 1;
    if (passChars.upper.length) result += 1;
    if (passChars.spec.length) result += 1;
    if (passChars.length) result += 1;

    return result;
  }, []);

  useEffect(() => {
    const strength = parsePassword(password);
    setPower(strength);
  }, [parsePassword, password]);

  useEffect(() => {
    if (power === 5) setColor('#4CAF50');
    if (power === 4) setColor('#8BC34A');
    if (power === 3) setColor('#FFC107');
    if (power === 2) setColor('#FF9800');
    if (power === 1) setColor('#F44336');
    if (power === 0) setColor('none');
  }, [power]);

  return (
    <div className="power-wrapper">
      {power > 4 && (
        <div className="power-level" style={{ backgroundColor: color }} />
      )}
      {power > 3 && (
        <div className="power-level" style={{ backgroundColor: color }} />
      )}
      {power > 2 && (
        <div className="power-level" style={{ backgroundColor: color }} />
      )}
      {power > 1 && (
        <div className="power-level" style={{ backgroundColor: color }} />
      )}
      {power > 0 && (
        <div className="power-level" style={{ backgroundColor: color }} />
      )}
    </div>
  );
};
