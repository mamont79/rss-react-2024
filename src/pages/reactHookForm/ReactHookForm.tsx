import { useForm, SubmitHandler } from 'react-hook-form';
import { Header } from '../../components/header/header';
import { UserData, Gender } from '../../types/types';
import { useDispatch } from 'react-redux';
import { filterCountries } from '../../store/slices/countrySlice';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { OpenEye } from '../../assets/openEye';
import { ClosedEye } from '../../assets/closedEye';
import { PasswordStrength } from '../../components/passwordStrength/PasswordStrength';
import { setUserData, setUserFile } from '../../store/slices/userSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../schemas/schema';
import { useNavigate } from 'react-router-dom';

export const ReactHookForm = () => {
  const { data, files } = useSelector((state: RootState) => state.user);
  const { output } = useSelector((state: RootState) => state.country);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<UserData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: data[0]?.name || '',
      age: data[0]?.age || 0,
      email: data[0]?.email || '',
      password: data[0]?.password || '',
      confirmPassword: data[0]?.confirmPassword || '',
      gender: (data[0]?.gender as Gender) || '',
      acceptTC: data[0]?.acceptTC || false,
      country: data[0]?.country || '',
      userPicture: '',
    },
  });
  const onSubmit: SubmitHandler<UserData> = async (data: UserData) => {
    try {
      const fullData = { ...data, pictureName: files[0].name };
      console.log(fullData);
      dispatch(setUserData(fullData));
      navigate('/');
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const [showCountryOptions, setShowCountryOptions] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const getCountries = () => {
    const inputValue = watch('country') || '';
    dispatch(filterCountries(inputValue));
    setShowCountryOptions(inputValue.length > 0);
  };

  const handleCountrySelect = (country: string) => {
    setValue('country', country);
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
        setValue('userPicture', base64String as string);
      });
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

  return (
    <>
      <Header />
      <div>
        <h1 className="title">React Hook Form:</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Name:
            <input className="input" type="text" {...register('name')} />
          </label>
          {errors.name && <p className="error">{errors.name.message}</p>}

          <label>
            Age:
            <input className="input" type="number" {...register('age')} />
          </label>
          {errors.age && <p className="error">{errors.age.message}</p>}

          <label>
            Email:
            <input className="input" type="text" {...register('email')} />
          </label>
          {errors.email && <p className="error">{errors.email.message}</p>}

          <label>
            Password:
            <input
              className="input"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
            />
            <span
              className="visibility"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <OpenEye /> : <ClosedEye />}
            </span>
            {watch('password') && (
              <PasswordStrength password={watch('password')} />
            )}
          </label>
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          <label>
            Confirm password:
            <input
              className="input"
              type={showConfPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
            />
            <span
              className="visibility"
              onClick={() => setShowConfPassword(!showConfPassword)}
            >
              {showConfPassword ? <OpenEye /> : <ClosedEye />}
            </span>
          </label>
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}

          <label>
            Gender:
            <select {...register('gender')} className="select">
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="not selected">Want not to select</option>
            </select>
          </label>
          {errors.gender && <p className="error">{errors.gender.message}</p>}

          <label>
            Country:
            <input
              className="input"
              type="text"
              {...register('country', {
                onChange: () => {
                  getCountries();
                },
              })}
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
          {errors.country && <p className="error">{errors.country.message}</p>}

          <label>
            User Picture:
            <input
              className="input-file"
              type="file"
              accept="image/jpeg, image/png"
              onInput={handleImageUpload}
            />
            {files.length > 1 && (
              <div className="file-name">Selected file: {files[0].name}</div>
            )}
          </label>
          {errors.userPicture && (
            <p className="error">{errors.userPicture.message}</p>
          )}

          <label className="label-accept">
            <input type="checkbox" {...register('acceptTC')} /> I solemnly swear
            to read the Terms and Conditions (or at least pretend to)
          </label>
          {errors.acceptTC && (
            <p className="error">{errors.acceptTC.message}</p>
          )}

          <input type="submit" className="submit-button" />
        </form>
      </div>
    </>
  );
};
