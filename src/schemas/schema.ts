import * as Yup from 'yup';
export const schema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[А-ЯA-Z][а-яa-zА-ЯA-Z]*$/,
      'Name must start with an uppercase letter'
    )
    .required(),
  age: Yup.number()
    .test('is-required', 'Age must be a positive number', (value) => {
      return value !== undefined && value > 0;
    })
    .min(0, 'Age must be a positive number')
    .required('Age is required'),
  email: Yup.string().email('Invalid email').required(),
  password: Yup.string()
    .min(8)
    .required('Password is required')
    .test('has-number', 'Password must contain at least one number', (value) =>
      /[0-9]/.test(value || '')
    )
    .test(
      'has-lowercase',
      'Password must contain at least one lowercase letter',
      (value) => /[a-z]/.test(value || '')
    )
    .test(
      'has-uppercase',
      'Password must contain at least one uppercase letter',
      (value) => /[A-Z]/.test(value || '')
    )
    .test(
      'has-special-char',
      'Password must contain at least one special character',
      (value) => /[@$!%*?&-_]/.test(value || '')
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required(),
  gender: Yup.string()
    .oneOf(['male', 'female', 'other', 'not selected'], 'Gender is required')
    .required('Gender is required'),
});
