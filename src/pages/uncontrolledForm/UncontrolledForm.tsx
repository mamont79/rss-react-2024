import { FormEvent, useEffect, useRef, useState } from 'react';
import { Header } from '../../components/header/header';
import { ClosedEye } from '../../assets/closedEye';
import { OpenEye } from '../../assets/openEye';
import * as Yup from 'yup';
import { UserData } from '../../types/types';
import { schema } from '../../schemas/schema';
import { useDispatch, useSelector } from 'react-redux';

import { setUserData } from '../../store/slices/userSlice';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';

export const UncontrolledForm = () => {
  const { data } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (data.length > 1) {
      const userData = data[0];
      if (nameRef.current) nameRef.current.value = userData.name;
      if (ageRef.current)
        ageRef.current.value = (userData.age || '').toString();
      if (emailRef.current) emailRef.current.value = userData.email;
      if (passwordRef.current) passwordRef.current.value = userData.password;
      if (confirmPasswordRef.current)
        confirmPasswordRef.current.value = userData.confirmPassword;
      if (genderRef.current) genderRef.current.value = userData.gender;
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent) => {
    setErrors({});
    e.preventDefault();
    const formData: UserData = {
      name: nameRef.current!.value,
      age: Number(ageRef.current!.value),
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
      confirmPassword: confirmPasswordRef.current!.value,
      gender: genderRef.current!.value,
      acceptTC: 'not accepted',
    };
    console.log(formData);

    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      dispatch(setUserData(formData));
      navigate('/');
    } catch (validationErrors) {
      if (validationErrors instanceof Yup.ValidationError) {
        const formattedErrors: { [key: string]: string } = {};
        validationErrors.inner.forEach((error) => {
          formattedErrors[error.path!] = error.message;
        });
        setErrors(formattedErrors);
      }
    }
  };
  return (
    <>
      <Header />
      <div>
        <h1 className="title">Uncontrolled Form:</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input className="input" type="text" name="name" ref={nameRef} />
          </label>
          {errors.name && <p className="error">{errors.name}</p>}
          <label>
            Age:
            <input className="input" type="number" name="age" ref={ageRef} />
          </label>
          {errors.age && <p className="error">{errors.age}</p>}
          <label>
            Email:
            <input className="input" type="text" name="email" ref={emailRef} />
          </label>
          {errors.email && <p className="error">{errors.email}</p>}
          <label>
            Password:
            <input
              className="input"
              type={showPassword ? 'text' : 'password'}
              name="password"
              ref={passwordRef}
            />
            <span
              className="visibility"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <OpenEye /> : <ClosedEye />}
            </span>
          </label>
          {errors.password && <p className="error">{errors.password}</p>}
          <label>
            Confirm password:
            <input
              className="input"
              type={showConfPassword ? 'text' : 'password'}
              name="password"
              ref={confirmPasswordRef}
            />
            <span
              className="visibility"
              onClick={() => setShowConfPassword(!showConfPassword)}
            >
              {showConfPassword ? <OpenEye /> : <ClosedEye />}
            </span>
          </label>
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
          <label>
            Gender:
            <select name="gender" ref={genderRef} className="select">
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="not selected">Don't want to select</option>
            </select>
          </label>
          {errors.gender && <p className="error">{errors.gender}</p>}

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
