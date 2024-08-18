import * as Yup from 'yup';
export const schema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[А-ЯA-Z][а-яa-zА-ЯA-Z]*$/,
      'name must start with an uppercase letter'
    )
    .required('name is required'),
  age: Yup.number()
    .test('is-required', 'age must be a positive number', (value) => {
      return value !== undefined && value > 0;
    })
    .min(0, 'age must be a positive number')
    .max(200, 'it is impossible, please write real age')
    .required('age is required'),
  email: Yup.string().email('invalid email').required('email is required'),
  password: Yup.string()
    .min(8)
    .required('password is required')
    .test('has-number', 'password must contain at least one number', (value) =>
      /[0-9]/.test(value || '')
    )
    .test(
      'has-special-char',
      'Password must contain at least one special character',
      (value) => {
        return /[@$!%*?&_-]/.test(value || '');
      }
    )
    .test(
      'has-lowercase',
      'password must contain at least one lowercase letter',
      (value) => /[a-z]/.test(value || '')
    )
    .test(
      'has-uppercase',
      'password must contain at least one uppercase letter',
      (value) => /[A-Z]/.test(value || '')
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'passwords must match')
    .required('confirm password is required'),
  gender: Yup.string()
    .oneOf(['male', 'female', 'other', 'not selected'], 'gender is required')
    .required('gender is required'),
  acceptTC: Yup.boolean()
    .oneOf([true], 'you must accept the terms and conditions')
    .required('you must accept the terms and conditions'),
  country: Yup.string().required('country is required'),
  userPicture: Yup.mixed()
    .required('Profile picture is required')
    .test('fileSize', 'File size must be less than 1MB', (value) => {
      if (!value) return false;
      const base64Str = value as string;
      const fileSizeInBytes =
        base64Str.length * (3 / 4) -
        (base64Str.indexOf('=') > 0
          ? base64Str.length - base64Str.indexOf('=')
          : 0);
      return fileSizeInBytes <= 1 * 1024 * 1024;
    })
    .test(
      'fileType',
      'Only .jpeg and .png formats are allowed',
      (value) =>
        (value as string).includes('image/jpeg') ||
        (value as string).includes('image/png')
    ),
});
