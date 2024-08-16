import { FormEvent, useEffect, useRef, useState } from 'react';
import { Header } from '../../components/header/header';
import { ClosedEye } from '../../assets/closedEye';
import { OpenEye } from '../../assets/openEye';
import * as Yup from 'yup';
import { UserData } from '../../types/types';
import { schema } from '../../schemas/schema';
import { useDispatch, useSelector } from 'react-redux';

import { setUserData, setUserFile } from '../../store/slices/userSlice';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { filterCountries } from '../../store/slices/countrySlice';
import { PasswordStrength } from '../../components/passwordStrength/PasswordStrength';

export const UncontrolledForm = () => {
  const { data, files } = useSelector((state: RootState) => state.user);
  const { output } = useSelector((state: RootState) => state.country);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordToCheck, setPasswordToCheck] = useState(
    data[0].password || ''
  );
  const [showCountryOptions, setShowCountryOptions] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const acceptTCRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      if (countryRef.current) countryRef.current.value = userData.country;
      if (fileInputRef.current && files) {
        fileInputRef.current.files = new DataTransfer().files;
      }
      if (acceptTCRef.current)
        acceptTCRef.current.checked = userData.acceptTC || false;
    }
  }, [data, files]);

  const getCountries = () => {
    const inputValue = countryRef.current?.value || '';
    dispatch(filterCountries(inputValue));
    setShowCountryOptions(inputValue.length > 0);
  };

  const handleCountrySelect = (country: string) => {
    if (countryRef.current) {
      countryRef.current.value = country;
    }
    setShowCountryOptions(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      convertFileToBase64(file).then((base64String) => {
        dispatch(
          setUserFile({
            name: file.name,
            size: file.size,
            base64: base64String as string,
          })
        );
      });
    }
  };

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
      acceptTC: acceptTCRef.current!.checked,
      country: countryRef.current!.value,
      userPicture: files[0].base64 || '',
      pictureName: files[0].name || '',
    };
    console.log(formData);

    if (fileInputRef.current?.files?.length) {
      const file = fileInputRef.current.files[0];
      formData.userPicture = (await convertFileToBase64(file)) as string;
    }

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

  const convertFileToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordToCheck(e.target.value);
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
              onChange={handlePasswordCheck}
            />
            <span
              className="visibility"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <OpenEye /> : <ClosedEye />}
            </span>
            {passwordToCheck && <PasswordStrength password={passwordToCheck} />}
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
              <option value="not selected">Want not to select</option>
            </select>
          </label>
          {errors.gender && <p className="error">{errors.gender}</p>}

          <label>
            Country:
            <input
              onChange={getCountries}
              className="input"
              type="text"
              name="country"
              ref={countryRef}
            />
            {showCountryOptions && (
              <ul className="country-list">
                {output.map((country, index) => (
                  <li
                    key={index}
                    onClick={() => handleCountrySelect(country)}
                    className="country-item"
                  >
                    {country}
                  </li>
                ))}
              </ul>
            )}
          </label>
          {errors.country && <p className="error">{errors.country}</p>}

          <label>
            User Picture:
            <input
              className="input-file"
              type="file"
              ref={fileInputRef}
              accept="image/jpeg, image/png"
              onInput={handleImageUpload}
            />
            {files.length > 1 && (
              <div className="file-name">Selected file: {files[0].name}</div>
            )}
          </label>
          {errors.userPicture && <p className="error">{errors.userPicture}</p>}

          <label className="label-accept">
            <input type="checkbox" ref={acceptTCRef} name="acceptTC" /> I
            solemnly swear to read the Terms and Conditions (or at least pretend
            to)
          </label>
          {errors.acceptTC && <p className="error">{errors.acceptTC}</p>}

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
